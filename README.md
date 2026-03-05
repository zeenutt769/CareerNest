<div align="center">

# 🪺 CareerNest

### *Smart Job Matching for Students & Freshers*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

> **CareerNest** is a modern, full-featured job board platform designed specifically for students and freshers. It aggregates job opportunities, offers an AI-powered ATS resume checker, and helps candidates land their first role — all in one sleek dark-mode interface.

<br/>

![CareerNest Banner](https://img.shields.io/badge/🚀_Live_Demo-Coming_Soon-blueviolet?style=for-the-badge)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Smart Job Matching** | Browse curated job listings filtered by tech stack, salary, location & experience |
| 📄 **ATS Resume Checker** | Upload your PDF resume + paste a JD to get an instant ATS score with matched/missing keywords |
| 📊 **Personal Dashboard** | Track applications, deadlines, skill gaps, ATS scores & quick actions in one place |
| 👥 **Community** | Connect, share, and discuss with peers and professionals |
| 🏢 **Hiring Resources** | Access guides, tips, and resources for hiring managers and recruiters |
| 🙋 **FAQ** | Answers to common questions about the platform |
| 🔐 **Auth System** | JWT-based login with protected routes; guest-friendly public pages |
| ✨ **Smooth Animations** | Page transitions, scroll animations, and micro-interactions via Framer Motion |
| 🌌 **Particle Background** | Dynamic animated background for a premium look and feel |
| 📱 **Fully Responsive** | Optimized for all screen sizes, from mobile to desktop |

---

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://reactjs.org/)** — UI library
- **[Vite 7](https://vitejs.dev/)** — Lightning-fast build tool & dev server
- **[React Router DOM v7](https://reactrouter.com/)** — Client-side routing
- **[Framer Motion](https://www.framer.com/motion/)** — Animations & page transitions
- **[Zustand](https://zustand-demo.pmnd.rs/)** — Lightweight state management
- **[React Hook Form](https://react-hook-form.com/)** — Performant form handling
- **[Recharts](https://recharts.org/)** — Data visualization & charts
- **[Lucide React](https://lucide.dev/)** — Beautiful icon library
- **[Axios](https://axios-http.com/)** — HTTP client
- **[TailwindCSS v4](https://tailwindcss.com/)** — Utility-first CSS (via Vite plugin)
- **CSS Custom Properties** — Glassmorphism design system, custom tokens

### Backend *(Expected)*
- **Node.js + Express** — REST API server
- **JWT** — Authentication tokens
- **ATS Analysis Engine** — Resume keyword matching against job descriptions

---

## 📁 Project Structure

```
CareerNest/
│
├── frontend/                   # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── CountUp.jsx         # Animated number counter
│   │   │   ├── JobModal.jsx         # Job detail modal
│   │   │   ├── NavBar.jsx           # Navigation bar
│   │   │   ├── PageTransition.jsx   # Animated route transitions
│   │   │   ├── ParticleBackground.jsx # Dynamic particle canvas
│   │   │   ├── ProtectedRoute.jsx   # Auth guard component
│   │   │   └── Toast.jsx            # Toast notification system
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state & JWT logic
│   │   │
│   │   ├── data/                    # Static/mock data files
│   │   │
│   │   ├── pages/              # Full-page route components
│   │   │   ├── Landing.jsx          # Home / hero page
│   │   │   ├── Login.jsx            # Login / signup page
│   │   │   ├── LoginSuccess.jsx     # Post-login redirect
│   │   │   ├── Dashboard.jsx        # User dashboard (protected)
│   │   │   ├── FindJob.jsx          # Job listing & search (protected)
│   │   │   ├── ATSCheck.jsx         # ATS resume checker (protected)
│   │   │   ├── Profile.jsx          # User profile page (protected)
│   │   │   ├── Community.jsx        # Community forum (protected)
│   │   │   ├── Hiring.jsx           # Hiring resources (protected)
│   │   │   └── FAQ.jsx              # FAQ page (public)
│   │   │
│   │   ├── store/                   # Zustand stores
│   │   ├── App.jsx                  # Root component, routing setup
│   │   ├── index.css                # Global styles & design system
│   │   ├── responsive.css           # Mobile responsive overrides
│   │   └── main.jsx                 # Vite entry point
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **[Node.js](https://nodejs.org/)** v18 or higher
- **npm** v9 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CareerNest.git
cd CareerNest
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `frontend/` directory:

```env
VITE_API_BASE=http://localhost:5000
```

> Replace `http://localhost:5000` with your backend API URL if different.

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)**

### 5. Build for Production

```bash
npm run build
```

---

## 📸 Pages Overview

### 🏠 Landing Page
Hero section with email CTA, feature cards (Smart Matching, ATS Checker, Daily Digest), how-it-works steps, and a call-to-action band.

### 🔐 Login Page
Clean, minimal login/signup form with JWT-based authentication. Redirects to Dashboard on success.

### 📊 Dashboard *(Protected)*
Overview of application stats, best job matches, application tracker, deadlines & reminders, skill gap analysis, and quick action buttons.

### 🔍 Find Jobs *(Protected)*
Browse and search through curated job listings with filters for role, location, and tech stack. View full job details in a modal.

### 📄 ATS Resume Checker *(Protected)*
- Upload resume (PDF, max 5MB)
- Paste any job description
- Instantly get an ATS match score (0–100)
- See matched ✅ and missing ❌ keywords
- Receive actionable improvement tips

### 👤 Profile *(Protected)*
Manage your academic details, skills, and career preferences.

### 👥 Community *(Protected)*
Forum-style discussion boards to connect with peers and professionals.

### 🏢 Hiring Resources *(Protected)*
Guides and tools for understanding the hiring process.

### ❓ FAQ *(Public)*
Frequently asked questions about CareerNest.

---

## 🔌 API Integration

The frontend communicates with a backend REST API. Key endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | User login, returns JWT |
| `POST` | `/api/ats/analyze` | Analyze resume against job description |
| `GET` | `/api/jobs` | Fetch job listings |

> Set your backend base URL in the `VITE_API_BASE` environment variable.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'Add: your feature description'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Made with ❤️ for students and freshers trying to land their first role.

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

</div>
