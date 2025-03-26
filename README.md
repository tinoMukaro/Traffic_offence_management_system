🚦 Traffic Offence Management System (TOMS)
📌 Description
TOMS is a web-based system for managing traffic offenses, logging violations, assigning penalty points, and notifying offenders within 24 hours of an offense being logged. The system calculates fines based on offense severity and adjusts penalties for repeat offenders through a multiplier system.

🛠️ Tech Stack
Frontend: Vite + React + Bootstrap

Backend: Node.js + Express.js

Database: PostgreSQL

Architecture: MVC

🚀 Features
✅ Log traffic offenses
✅ Assign penalty points based on severity
✅ Send notifications to offenders
✅ Adjust fines for repeat offenders
✅ Decay penalty points over time

📂 Folder Structure
bash
Copy
Edit
├── backend/        # Backend code (Node.js + Express.js)
├── frontend/       # Frontend code (Vite + React)
├── .gitignore
├── README.md
└── package.json
⚙️ Setup
Clone the repo

bash
git clone https://github.com/your-username/toms.git
Navigate to the project

bash
cd toms
Install dependencies

bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
Create a .env file in the backend folder with the following structure:

env
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASS=your-db-password
Run the project

Start the frontend:

bash
cd frontend
npm run dev
Start the backend:

bash
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
This project is licensed under the MIT License.

