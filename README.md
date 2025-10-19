# 🔗 TinyUrl

A modern, minimal, and fully functional **URL Shortener** built using the **MERN stack** (MongoDB, Express.js, React, Node.js).  
TinyUrl allows users to **shorten long URLs**, **manage them through an authenticated dashboard**, **view analytics**, and **name each short link** ✨.

## Features

### 🔐 Authentication

- Register and login securely with JWT-based authentication.
- Tokens are stored safely in `localStorage`.
- Protected routes on both frontend and backend.
- Tokens are refreshed automatically.

### 🔗 URL Management

- Create short URLs for any long valid link.
- Each short URL includes:
  - **Title**
  - **Description**
  - **Short code**
  - **Original URL**
  - **Created and updated timestamps**
- Edit or delete URLs anytime.
- Copy short URL with one click.
- Auto-generate **QR Code** for each short URL.
- View all your shortened URLs in a clean dashboard.

### 📊 Analytics

- Track the **number of clicks** for each short URL.
- View **click logs** with IP and timestamp for every visit.

### 💡 Extra

- Responsive UI using **TailwindCSS**.
- Toast notifications for success and error feedback.
- Minimal looks for a smooth user experience.

---

## 🛠️ Tech Stack

### Frontend

- **React (TypeScript)**
- **TailwindCSS**
- **Axios**
- **React Router**
- **React-QR-Code**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **CORS and dotenv** for security & configuration

---

## 🧩 API Endpoints Overview

### Auth Routes

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | `/api/v1/auth/register` | Register new user          |
| POST   | `/api/v1/auth/login`    | Login and get access token |

### URL Routes (Protected)

| Method | Endpoint                       | Description                                     |
| ------ | ------------------------------ | ----------------------------------------------- |
| POST   | `/api/v1/urls`                 | Create short URL (includes title & description) |
| GET    | `/api/v1/urls`                 | Get all URLs of logged-in user                  |
| GET    | `/api/v1/urls/:shortCode`      | Get details of a short URL                      |
| PUT    | `/api/v1/urls/:shortCode`      | Update long URL, title, or description          |
| DELETE | `/api/v1/urls/:shortCode`      | Delete short URL                                |
| GET    | `/api/v1/urls/:shortCode/logs` | Get click analytics                             |

---
