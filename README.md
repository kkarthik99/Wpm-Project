🌴 AI Travel Planner
A full-stack AI-powered travel planning platform built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) and Google Gemini AI integration. Create personalized travel itineraries instantly using natural language prompts.

✨ Features
🤖 AI-Powered Planning: Generate detailed travel plans using Google Gemini AI

🎨 Beautiful UI: Glass morphism design with stunning travel imagery

🔐 Secure Authentication: JWT-based user registration and login

💰 Smart Budgeting: AI calculates and allocates travel budgets

📱 Responsive Design: Works seamlessly on all devices

⚡ Real-time Processing: Instant travel plan generation

🛠️ Tech Stack
Frontend: Angular 20, TypeScript, Bootstrap 5, RxJS

Backend: Node.js, Express.js, JWT, bcryptjs

Database: MongoDB with Mongoose

AI Integration: Google Gemini AI 2.0 Flash

Styling: CSS3, Glass Morphism, Animations

🚀 Quick Start
Prerequisites
Node.js (v18 or higher)

MongoDB (local or Atlas)

Google Gemini API key

Installation
Clone the repository

bash
git clone <repository-url>
cd aitravel
Backend Setup

bash
cd backend
npm install
Frontend Setup

bash
cd ../frontend
npm install
Environment Configuration

Backend: Create backend/.env

env
MONGODB_URI=mongodb://localhost:27017/aitravel
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
Run the Application

Terminal 1 (Backend):

bash
cd backend
npm run dev
Terminal 2 (Frontend):

bash
cd frontend
ng serve
Access the Application

Frontend: http://localhost:4200

Backend API: http://localhost:5000

📁 Project Structure
text
aitravel/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication
│   └── server.js        # Main server file
├── frontend/
│   ├── src/app/
│   │   ├── components/  # Angular components
│   │   ├── services/    # API services
│   │   └── models/      # TypeScript interfaces
│   └── assets/          # Images and static files
🗄️ Database Collections
users: User accounts and authentication

trips: AI-generated travel plans and itineraries

destinations: Travel destination information

user_sessions: Authentication sessions

system_logs: Application monitoring

🔧 API Endpoints
POST /api/auth/signup - User registration

POST /api/auth/login - User authentication

POST /api/trip/generate - Generate travel plans

🎯 Usage
Sign Up/Login: Create an account or login

Describe Your Trip: Enter travel requirements in natural language

Example: "2 people, 7 days, 1 lakh budget, Goa beaches and nightlife"

Get AI Plan: Receive detailed itinerary with budget, activities, and tips

Save & Share: Save plans for future reference

🔐 Security Features
Password encryption with bcrypt

JWT token authentication

Input validation and sanitization

CORS protection

Environment variable security

🌟 Future Enhancements
Mobile application

Hotel and flight booking integration

Travel community features

Multi-language support

Offline functionality

📄 License
This project is for educational and personal use.

🤝 Contributing
Contributions, issues, and feature requests are welcome!

Built with ❤️ using MEAN Stack & AI Magic ✨
