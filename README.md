# 📦 Courier and Parcel Management System – Backend

This is the **backend** service for the Courier and Parcel Management System, built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. It supports features like authentication, role-based access (Admin, Customer, Agent), parcel management, agent assignment, real-time location tracking via Socket.IO, and exportable reports.

## 🚀 Features

- 🔐 JWT Authentication with Access & Refresh tokens
- 👥 Role-based Access Control (Admin, Customer, Agent)
- 📦 Parcel CRUD operations
- 📍 Real-time location tracking using Socket.IO
- 📤 Assign Agents to Parcels
- 📊 Dashboard metrics (parcel counts, agent/customer stats)
- 📄 Report export as PDF and CSV
- 🌐 CORS & environment-based configuration
- ✅ RESTful API with Postman Collection

---

## 🛠️ Tech Stack

- **Express.js**
- **TypeScript**
- **Mongoose**
- **Socket.IO**
- **PDFKit**, **json2csv**
- **bcryptjs**, **jsonwebtoken**
- **dotenv**, **cors**

---

## 🧑‍💻 Getting Started

### 📦 Install dependencies

```bash
pnpm install
# or
npm install
