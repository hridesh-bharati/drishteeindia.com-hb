# 🎓 Drishtee Computer Center – Web App (DIIT)

> A powerful, progressive web application for **Drishtee Institute of Information Technology (DIIT)** – enabling online certificate verification, digital student access, and a mobile-first experience.
 
<img width="1365" height="728" alt="DIITV2" src="https://github.com/user-attachments/assets/1e5ba55e-9a04-488b-bd00-7804b5a25491" />

---

## ✨ Features

- ✅ **Certificate Verification** with Captcha Validation
- 🧾 **PDF Certificate Download**
- 📲 **PWA Support** – Install like a native app
- 🌍 **Multi-language Support** (Google Translate)
- 🎨 Sleek UI with **Custom CSS Framework**
- 📊 Admin & Student Login System
- 🔐 Secure REST API Integration
- 💬 Typing Animation & Scroll Animations
- 📷 Optimized for Desktop + Mobile

---

## 🛠️ Tech Stack

| Frontend       | Backend         | Libraries & Tools             |
|----------------|------------------|-------------------------------|
| React (Vite)   | Node.js + Express | `vite-plugin-pwa`, `html2pdf.js` |
| Custom CSS (hbfremwork.css) | MongoDB (or local JSON) | Typed.js, AOS, Bootstrap Icons |
| React Router   | CORS & Helmet    | Google Translate, JWT (optional) |

---

## 🗂️ Folder Structure

diit-webapp/
├── public/
│ ├── icon-192.png
│ ├── icon-512.png
│ └── manifest.json
├── src/
│ ├── components/
│ ├── store/
│ ├── api/
│ └── App.jsx
├── vite.config.js
├── package.json
└── README.md

2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the App in Dev Mode
bash
Copy
Edit
npm run dev
For LAN Testing:
bash
Copy
Edit
npm run dev -- --host
Your app will be accessible at: http://192.168.xxx.xxx:5173/

4. Build for Production
bash
Copy
Edit
npm run build
5. Preview Production Build
bash
Copy
Edit
npm run preview
📱 PWA Installation Guide
Open the site on any mobile browser (Chrome, Safari, Edge).

Tap Add to Home Screen when prompted.

Enjoy the app offline like a native app.
