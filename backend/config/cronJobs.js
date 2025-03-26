const cron = require('node-cron');
const pool = require('./db');

const MAX_RETRIES = 3;
let retryCount = 0;

const startPenaltyPointsCron = () => {
  cron.schedule('0 2 * * *', async () => { // Runs at 02:00 AM
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const eligibleOffendersQuery = `
        SELECT o.license_number, o.total_points
        FROM offenders o
        WHERE o.total_points > 0
        AND NOT EXISTS (
          SELECT 1
          FROM offender_offenses oo
          WHERE oo.license_number = o.license_number
          AND oo.created_at >= NOW() - INTERVAL '6 months'
        );
      `;
      const eligibleOffenders = await client.query(eligibleOffendersQuery);

      for (const offender of eligibleOffenders.rows) {
        const { license_number, total_points } = offender;
        let newPoints = total_points > 10 ? total_points - 10 : 0;
        newPoints = Math.max(newPoints, 0);

        const updatePointsQuery = `
          UPDATE offenders
          SET total_points = $1
          WHERE license_number = $2;
        `;
        await client.query(updatePointsQuery, [newPoints, license_number]);

        const logQuery = `
          INSERT INTO offender_logs (license_number, action, details, created_at)
          VALUES ($1, 'points_reduced', $2, NOW());
        `;
        const logDetails = `Points reduced from ${total_points} to ${newPoints}`;
        await client.query(logQuery, [license_number, logDetails]);
      }

      await client.query('COMMIT');
      console.log('Cron job completed successfully.');
      retryCount = 0;
    } catch (error) {
      await client.query('ROLLBACK');

      if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.warn(`Cron job failed. Retrying (${retryCount}/${MAX_RETRIES})...`);
        return;
      }

      console.error('Cron job failed after maximum retries:', error);
      const errorLogQuery = `
        INSERT INTO offender_logs (license_number, action, details, created_at)
        VALUES ($1, 'cron_error', $2, NOW());
      `;
      await client.query(errorLogQuery, ['system', `Cron job failed: ${error.message}`]);
    } finally {
      client.release();
    }
  });
};

module.exports = startPenaltyPointsCron;
