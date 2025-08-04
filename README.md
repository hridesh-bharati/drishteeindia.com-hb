# 🎓 Drishtee Computer Center – Web App (DIIT)

> A powerful, progressive web application for **Drishtee Institute of Information Technology (DIIT)** – enabling online certificate verification, student login, and a mobile-first, Windows-style experience.

---

![DIIT App Preview](https://raw.githubusercontent.com/hridesh-bharati/drishteeindia.com-hb/refs/heads/main/FrontEnd/public/images/mainSlider/slider3.webp)

---

## ✨ **Features**

- ✅ **Online Certificate Verification** with Captcha Validation
- 🧾 **PDF Certificate Download** (Printable Format)
- 📲 **Progressive Web App (PWA)** – Install on Mobile or Desktop
- 🌍 **Multi-language Support** ...........
- 🎨 Beautiful UI with **Bootstrap 5** + **Custom Windows-style CSS**
- 📊 Role-Based Login System for **Admin** & **Students**
- 🔐 Secure API using Express (JWT optional)
- 💬 Typing Text & Scroll Animations (Typed.js + AOS)
- ⚙️ Optimized for Desktop & Mobile Screens

---
## 🛠️ Tech Stack

| Frontend        | Backend           | Tools / Libraries                        |
|-----------------|-------------------|------------------------------------------|
| React + Vite    | Node.js + Express | `vite-plugin-pwa`, `html2pdf.js`         |
| Bootstrap 5     | MongoDB / JSON    | Typed.js, AOS, ...... Translate          |
| Custom CSS      | Helmet, CORS      | React Router, Bootstrap Icons, JWT (opt) |

---
## 📁 Folder Structure

| Path                      | Description                   |
|---------------------------|-------------------------------|
| `diit-webapp/`            | Root project folder           |
| ├── `public/`             | Static files (PWA assets)     |
| │ ├── `icon-192.png`      | App icon (192px)              |
| │ ├── `icon-512.png`      | App icon (512px)              |
| │ └── `manifest.json`     | PWA manifest file             |
| ├── `src/`                | Source code directory         |
| │ ├── `components/`       | React UI components           |
| │ ├── `api/`              | API functions (frontend)      |
| │ ├── `store/`            | Global state management       |
| │ └── `App.jsx`           | Main app entry point          |
| ├── `vite.config.js`      | Vite configuration            |
| ├── `package.json`        | Project metadata & scripts    |
| └── `README.md`           | Project documentation         |

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
