# 🎓 Drishtee Computer Center – Web App (DIIT)

> A powerful, progressive web application for **Drishtee Institute of Information Technology (DIIT)** – enabling online certificate verification, student login, and a mobile-first, Windows-style experience.

---

![DIIT App Preview](https://github.com/user-attachments/assets/1e5ba55e-9a04-488b-bd00-7804b5a25491)

---

## ✨ **Features**

- ✅ **Online Certificate Verification** with Captcha Validation
- 🧾 **PDF Certificate Download** (Printable Format)
- 📲 **Progressive Web App (PWA)** – Install on Mobile or Desktop
- 🌍 **Multi-language Support** using Google Translate
- 🎨 Beautiful UI with **Bootstrap 5** + **Custom Windows-style CSS**
- 📊 Role-Based Login System for **Admin** & **Students**
- 🔐 Secure API using Express (JWT optional)
- 💬 Typing Text & Scroll Animations (Typed.js + AOS)
- ⚙️ Optimized for Desktop & Mobile Screens

---

## 🛠️ **Tech Stack**

| Frontend        | Backend           | Tools / Libraries                        |
|-----------------|-------------------|------------------------------------------|
| React + Vite    | Node.js + Express | `vite-plugin-pwa`, `html2pdf.js`         |
| Bootstrap 5     | MongoDB / JSON    | Typed.js, AOS, Google Translate          |
| Custom CSS      | Helmet, CORS      | React Router, Bootstrap Icons, JWT (opt) |

---

## 📁 Folder Structure
diit-webapp/
├── public/
│ ├── icon-192.png
│ ├── icon-512.png
│ └── manifest.json
├── src/
│ ├── components/ # React UI Components
│ ├── api/ # API functions
│ ├── store/ # Global state
│ └── App.jsx # Main app entry point
├── vite.config.js
├── package.json
└── README.md
📱 **PWA Installation Steps**
1. Open the app in Chrome, Safari, or Edge.
2. You'll see a prompt to “Add to Home Screen”.
3. Tap to install the app as a native app.
4.Use it even when offline.

🖌️ **UI/UX Design**
1. 🎯 Windows-style loading screen for welcome
2. 🧭 Bootstrap 5 layout with responsive grid system
3.💬 Typed.js animations for typing effect
4.🌐 Built-in Translate support
5.🎨 Clean white background, blue accent colors (#1877f2)
6.📱 Optimized from 320px to full-width desktops (1920px+)

💡 **Future Enhancements**
1.🔍 Real-time certificate search by QR
2.📅 Attendance & course progress tracking
3.📥 Admin dashboard export (CSV, PDF)
4.👨‍🏫 Faculty login & class scheduling
5.📶 Live offline-first sync for mobile

📄 **License**
DIIT License © 2025 DRISHTEE INSTITUTE OF INFORMATION TECHNOLOGY
