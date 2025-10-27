# AI Travel Planner 🌴

AI Travel Planner is a full-stack, AI-powered travel planning platform built with the **MEAN stack** (MongoDB, Express, Angular, Node) and **Google Gemini AI** integration.  
Create personalised travel itineraries instantly using natural language prompts.

---

## ✨ Highlights

- **AI-Powered Planning:** Generate detailed, day-by-day itineraries using Google Gemini AI (Gemini 2.0 Flash).  
- **Beautiful UI:** Glass-morphism design with rich travel imagery and smooth animations.  
- **Secure Authentication:** JWT-based user registration and login with bcrypt encryption.  
- **Smart Budgeting:** Automatically calculates and allocates budgets for travel needs.  
- **Responsive Design:** Works flawlessly across mobile, tablet, and desktop.  
- **Real-time Processing:** Instant travel plan generation and saving.

---

## 🛠 Tech Stack

- **Frontend:** Angular 20, TypeScript, Bootstrap 5, RxJS  
- **Backend:** Node.js, Express.js, JWT, bcryptjs  
- **Database:** MongoDB with Mongoose  
- **AI Integration:** Google Gemini AI 2.0 Flash  
- **Styling:** CSS3, Glass Morphism, Animations  

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher  
- MongoDB (Local or Atlas)  
- Google Gemini API Key  

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aitravel
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

---

## ⚙️ Environment Configuration

Create a `.env` file inside the `backend` folder:

```env
MONGODB_URI=mongodb://localhost:27017/aitravel
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

---

## ▶️ Run the Application

### Terminal 1 (Backend)
```bash
cd backend
npm run dev
```

### Terminal 2 (Frontend)
```bash
cd frontend
ng serve
```

**Access the app:**  
- Frontend → http://localhost:4200  
- Backend → http://localhost:5000  

---

## 📁 Project Structure

```
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
```

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/login` | User authentication |
| POST | `/api/trip/generate` | Generate travel plans |
| POST | `/api/trip/save` | Save generated trip |
| GET  | `/api/trip/:id` | Fetch saved trip |

---

## 🧠 Example Usage

1. **Login / Sign Up:** Create an account or log in.  
2. **Describe Your Trip:** Example – “2 people, 7 days, ₹1 lakh, Goa beaches and nightlife.”  
3. **AI Generates Plan:** Get a full itinerary with places, budget, and tips.  
4. **Save & Share:** Store trips and share them easily.  

---

## 🔐 Security

- Password encryption with bcrypt  
- JWT token authentication  
- Input validation and sanitisation  
- CORS protection  
- Environment variable security  

---

## 🌟 Future Enhancements

- Mobile App version  
- Hotel & Flight Booking Integration  
- Travel Community Features  
- Multi-language Support  
- Offline Functionality  

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Built with ❤️ using the **MEAN Stack** & **Google Gemini AI** ✨
