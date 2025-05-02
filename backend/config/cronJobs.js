const cron = require('node-cron');
const pool = require('./db');

const MAX_RETRIES = 3;

// Core logic (extracted for manual/cron execution)
const executePenaltyPointsJob = async () => {
  console.log('⏳ Starting penalty points reduction...');
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const client = await pool.connect();
    try {
      // 👇 Updated query (1 month interval)
      const { rows } = await client.query(`
        SELECT license_number, total_points 
        FROM offenders 
        WHERE total_points > 0 
        AND NOT EXISTS (
          SELECT 1
          FROM offender_offenses oo
          WHERE oo.license_number = offenders.license_number
          AND oo.created_at >= NOW() - INTERVAL '1 month'
        )
      `);

      if (rows.length === 0) {
        console.log('🔍 No eligible offenders found.');
        return { success: true, message: "No offenders to process." };
      }

      console.log(`🔧 Processing ${rows.length} offenders...`);
      for (const offender of rows) {
        const { license_number, total_points } = offender;
        const newPoints = Math.max(total_points - 10, 0);

        await client.query('BEGIN');
        await client.query(
          'UPDATE offenders SET total_points = $1 WHERE license_number = $2',
          [newPoints, license_number]
        );
        await client.query(
          'INSERT INTO offender_logs (license_number, action, details, created_at) VALUES ($1, $2, $3, NOW())',
          [license_number, 'points_reduced', `Reduced from ${total_points} to ${newPoints}`]
        );
        await client.query('COMMIT');
        console.log(`✅ Updated ${license_number} (Points: ${newPoints})`);
      }

      return { success: true, message: `${rows.length} offenders processed.` };
    } catch (error) {
      await client.query('ROLLBACK');
      retries++;
      console.error(`⚠️ Attempt ${retries} failed:`, error.message);
      if (retries >= MAX_RETRIES) {
        throw new Error(`🚨 Job failed after ${MAX_RETRIES} retries: ${error.message}`);
      }
    } finally {
      client.release();
    }
  }
};

// Cron scheduler (unchanged)
const startPenaltyPointsCron = () => {
  cron.schedule('0 2 * * *', executePenaltyPointsJob); // Runs at 2 AM daily
  console.log('⏰ Cron job scheduled for daily execution.');
};

module.exports = { startPenaltyPointsCron, executePenaltyPointsJob }; // Export both
