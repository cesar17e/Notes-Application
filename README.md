# 📝 **ThinkBoard — Notes Application**

A full-stack notes application built with **Node.js**, **Express**, **MongoDB**, **React**, and **TailwindCSS/DaisyUI**, featuring:

✔ User authentication (JWT)  
✔ Protected API routes  
✔ Create / Read / Update / Delete notes  
✔ Rate limiting (Upstash + Redis)  
✔ Responsive UI  
✔ Deployed on Render  

---

## 🚀 Live Demo

🌐 **Website:** https://notes-application-zeun.onrender.com/login

---

## 🛠 Tech Stack

### **Backend**
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT Authentication  
- Upstash Redis Rate Limiting  
- Render Deployment  

### **Frontend**
- React  
- React Router  
- Axios  
- TailwindCSS + DaisyUI  
- React Hot Toast  

---

## 📦 Features

- 🔐 **User Authentication**
  - Register  
  - Login  
  - JWT stored in localStorage  
  - Automatic session restoration  

- 📝 **Notes**
  - Create, view, update, delete  
  - Notes tied to authenticated user  
  - Secure protected routing  

- 🚫 **Rate Limiting**
  - Limits excessive requests  
  - Protects login from brute-force attacks  

- 🎨 **Responsive UI**
  - Tailwind + DaisyUI styling  
  - Clean and modern layout  

---

## 🗂 Folder Structure

root
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── server.js
│   └── package.json
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── lib
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
└── README.md


