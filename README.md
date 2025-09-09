Traffic Offence Management System (TOMS)
Description
**TOMS** is a web-based system for managing traffic offenses. 
It allows authorities to log violations, assign penalty points, notify offenders within 24 hours, and dynamically calculate fines based on offense severity.
It also increases fines for repeat offenders using a multiplier system — aiming to reduce repeat offenses over time.


Tech Stack
Frontend: [Vite]+ [React.js] + [TailwindCSS]
Backend: [Node.js]+ [Express.js]
Database: [PostgreSQL]
SMS Service: [Twilio]
Architecture: MVC (Model–View–Controller) |

Features
✅ Log traffic offenses
✅ Assign penalty points based on severity
✅ Send notifications to offenders
✅ Adjust fines for repeat offenders
✅ Decay penalty points over time

📂 Folder Structure
Edit
├── backend/        # Backend code (Node.js + Express.js)
├── frontend/       # Frontend code (Vite + React)
├── .gitignore
├── README.md
└── package.json

⚙️ Setup
Clone the repo: https://github.com/tinoMukaro/traffic_offence_management_system.git

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

#twilio setup
visit https://www.twilio.com/en-us/messaging/channels/sms
create a free account and youll get TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
enter those 3 in the /backend/.env file

#Database Setup (PostgreSQL)
1. Install PostgreSQL
If you don’t already have it installed, download and install it from:
https://www.postgresql.org/download/
2. Create a Database
Open your terminal or pgAdmin and create a new database for TOMS:
CREATE DATABASE toms_db;


#Create a .env file in the backend folder with the following structure:
.env/
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASS=your-db-password
JWT_SECRET=enter-your-jwt-token
JWT_EXPIRES_IN=1d
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number


Run the project
#Start the frontend:
cd frontend
npm run dev

#Start the backend:
cd backend
npm run dev

✅ How It Works
Admin and traffic officers can log offenses.
The system assigns penalty points based on the severity of the offense.
Repeat offenses increase fines via a penalty multiplier.
Offenders are notified within 24 hours of an offense.


👨‍💻 Author
TinoMukaro – GitHub

🌟 Contributing
Feel free to fork this repo and create a pull request if you'd like to contribute!

📄 License
This project is licensed under the Apache License.

