# AI Prompt Playground

A full-stack AI-powered web application that allows users to input prompts and receive AI-generated responses in a clean and interactive UI.

---

## 🚀 Features

* Prompt input with validation
* AI-generated responses using OpenAI API
* Markdown rendering (headings, lists, code blocks)
* Loading state with spinner
* Error handling with user-friendly messages
* Fallback response when API quota is exceeded
* Copy-to-clipboard functionality
* Clean and responsive UI using Material UI

---

## 🛠️ Tech Stack

**Frontend**

* React (Vite + TypeScript)
* Material UI (MUI)
* React Markdown

**Backend**

* Node.js
* Express.js
* OpenAI API

---

## 📁 Project Structure

ai-prompt-playground/
├── client/        # React frontend
├── server/        # Express backend
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/saieshwar/ai-prompt-playground.git
cd ai-prompt-playground

---

### 2. Backend Setup

cd server

Install dependencies:

npm install

Create a `.env` file:

PORT=5000
OPENAI_API_KEY=your_openai_api_key_here

Run backend:

npm run dev

---

### 3. Frontend Setup

Open a new terminal:

cd client

Install dependencies:

npm install

Run frontend:

npm run dev

---

## 🌐 Application URLs

* Frontend: http://localhost:5173
* Backend: http://localhost:5000

---

## ⚠️ Note on OpenAI API

This application uses OpenAI API for generating responses.

If you do not provide an API key or if quota is exceeded:

* The app will still function using a fallback response
* This ensures the demo remains fully functional

---

## 🎯 Key Design Decisions

* **Backend API layer** to securely handle OpenAI calls
* **Component-based architecture** for maintainability
* **Separation of concerns** (UI vs business logic)
* **Graceful error handling** for real-world scenarios
* **Markdown rendering** for better readability of AI responses

---

## 📌 Future Improvements

* Dark mode toggle
* Model selection dropdown
* Syntax highlighting for code blocks

---

## 🎥 Demo
https://drive.google.com/file/d/12ohQQmFakXwcAFdKBLvj-ML56Obs06Iv/view?usp=sharing



---

## 👤 Author

Sai Eshwar Reddy
