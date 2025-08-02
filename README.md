# 🎓 Drishtee Computer Center – Web App (DIIT)

> A powerful, responsive web application for **Drishtee Institute of Information Technology (DIIT)** – enabling **online certificate verification**, **student access**, and a **PWA-first** experience. Built with **React (Vite)** and designed with a sleek **Windows-style Bootstrap UI**.

---

![DIIT Preview](https://github.com/user-attachments/assets/1e5ba55e-9a04-488b-bd00-7804b5a25491)

---

## ✨ Features

- ✅ **Certificate Verification** with Captcha Security
- 🧾 **PDF Certificate Generation & Download**
- 📲 **PWA Support** – install on mobile/desktop
- 🌍 **Multi-language Translation** (via Google Translate)
- 🎨 Sleek, clean UI inspired by Windows 11
- 📊 Admin & Student Portals with Role-Based Access
- 🔐 Secure Backend APIs (JWT optional)
- 💬 Typing Animations & Scroll Effects (AOS)
- 📱 Fully responsive – works on all screen sizes

---

## 🛠️ Tech Stack

| Frontend        | Backend           | Libraries / Tools                            |
|-----------------|-------------------|----------------------------------------------|
| React + Vite    | Node.js + Express | `vite-plugin-pwa`, `html2pdf.js`, React Router |
| Bootstrap 5     | MongoDB / JSON    | AOS, Typed.js, Google Translate, Bootstrap Icons |
| Custom CSS      | Helmet & CORS     | JWT (optional), Netlify/Vercel Compatible     |

---

## 📁 Folder Structure

diit-webapp/
├── public/
│ ├── icon-192.png
│ ├── icon-512.png
│ └── manifest.json
├── src/
│ ├── components/ # Reusable UI components
│ ├── api/ # API communication layer
│ ├── store/ # Global state (optional)
│ └── App.jsx # Root app
├── vite.config.js
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🚀 Getting Started

### 📦 1. Install Dependencies

```bash
npm install
🔧 2. Run in Development Mode
bash
Copy
Edit
npm run dev
For LAN testing, run:

bash
Copy
Edit
npm run dev -- --host
App will be available at:

cpp
Copy
Edit
http://192.168.X.X:5173
🏗️ 3. Build for Production
bash
Copy
Edit
npm run build
🔍 4. Preview Production Build
bash
Copy
Edit
npm run preview
📱 PWA Installation
Open the app in Chrome, Safari, or Edge.

Click “Add to Home Screen” when prompted.

Use the app offline, like a native app!

🎨 UI / UX Highlights
⚡ Smooth loading animation (Windows-style dots)

💻 Responsive layout with Bootstrap 5 Grid

🌐 Multi-lingual support via Google Translate

🔵 Clean color palette (Blue/White contrast)

🖼️ Retina-ready image assets and iconography

📸 Screenshots
Desktop View	Mobile View
	(Add Mobile Screenshot Here)

💡 Future Improvements
📡 Live status API for certificate checks

👨‍🏫 Faculty login panel

🧠 AI-powered search in certificate records

✍️ Editable user profile settings

📬 Contributing
Feel free to fork, star ⭐️, and submit PRs or issues. Contributions are always welcome!

📄 License
MIT License © [Your Name or Organization]

🔗 Live Preview (Optional)
🌐 View Live App
