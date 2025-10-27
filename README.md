AI Travel Planner 🌴

AI Travel Planner is a full-stack, AI-powered travel planning platform built with the MEAN stack (MongoDB, Express, Angular, Node) and Google Gemini AI integration. Create personalised travel itineraries instantly using natural language prompts.

✨ Highlights

AI-Powered Planning: Generate detailed, day-by-day itineraries using Google Gemini AI (Gemini 2.0 Flash).

Beautiful UI: Glass-morphism design with rich travel imagery and smooth animations.

Secure Authentication: JWT-based registration & login with bcrypt password hashing.

Smart Budgeting: AI calculates and allocates budgets for transport, lodging, food and activities.

Responsive: Works across desktop, tablet and mobile.

Real-time: Instant travel plan generation and saving.

🧭 Features

Natural-language trip description → instant itinerary

Multi-person & multi-day planning (e.g., "2 people, 7 days, 1 lakh budget, Goa beaches & nightlife")

Budget breakdown and suggested activities

Save, edit and share trip plans

Role-based auth and secure session handling

Input validation and CORS protection

System logging for monitoring

🛠 Tech Stack

Frontend: Angular 20, TypeScript, Bootstrap 5, RxJS

Backend: Node.js, Express.js, bcryptjs, jsonwebtoken (JWT)

Database: MongoDB + Mongoose

AI: Google Gemini AI 2.0 Flash (via API)

Styling: CSS3, Glass Morphism + animations

🚀 Quick Start
Prerequisites

Node.js v18 or higher

MongoDB (local or Atlas)

Google Gemini API key

Install & Run

Clone the repo

git clone <repository-url>

cd aitravel

Backend

cd backend

npm install

Create a file named backend/.env with the environment variables (see below)

Start the backend (development): npm run dev

Frontend

cd ../frontend

npm install

Start Angular dev server: ng serve

Frontend runs at http://localhost:4200

APIs

Backend API base: http://localhost:5000

⚙ Environment Variables

Create backend/.env with the following keys:

MONGODB_URI = mongodb://localhost:27017/aitravel (or your Atlas connection string)

GEMINI_API_KEY = your_gemini_api_key_here

JWT_SECRET = your_jwt_secret_here

PORT = 5000

📁 Project Structure

aitravel/

backend/

models/ — MongoDB schemas

routes/ — API routes

middleware/ — auth & input validation

server.js — main server

frontend/

src/app/

components/ — Angular components

services/ — API services

models/ — TypeScript interfaces

assets/ — images & static files

🗄 Database Collections

users — user accounts and auth info

trips — AI-generated travel plans and saved itineraries

destinations — destination metadata and assets

user_sessions — active sessions and tokens

system_logs — monitoring & error logs

📡 Key API Endpoints

POST /api/auth/signup — register new user

POST /api/auth/login — authenticate user (returns JWT)

POST /api/trip/generate — generate trip plan from natural language input

GET /api/trip/:id — fetch saved trip

POST /api/trip/save — persist generated trip (requires auth)

🔐 Security

Passwords hashed with bcrypt

JWT-based auth and protected routes

Input validation and sanitisation to prevent injection

CORS configured for front-end domain

Secrets stored in environment variables, not in source

🧪 Example Usage (flow)

Sign up / Login.

Enter your trip prompt (examples: "2 people, 5 days, ₹60,000, Goa beaches & food").

AI returns itinerary: day-by-day plan, budget breakdown, places & tips.

Save the plan to your account and share a public link if desired.

📈 Future Enhancements

Mobile app (iOS / Android)

Hotel & flight booking integrations (OTA APIs)

Social & community features (user-shared itineraries, ratings)

Multi-language support

Offline caching & progressive web app support

🤝 Contributing

Contributions are welcome. Open issues or submit PRs for features, bugfixes or UI improvements. Please follow conventional commits and add clear descriptions for AI prompt changes.

📄 License

This project is for educational and personal use. See LICENSE for details.

Built with ❤️ using the MEAN stack + Google Gemini AI. Enjoy
