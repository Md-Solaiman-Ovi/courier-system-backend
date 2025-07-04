# 📦 Courier and Parcel Management System – Backend

This is the **backend** service for the Courier and Parcel Management System, built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. It supports features like authentication, role-based access (Admin, Customer, Agent), parcel management, agent assignment, real-time location tracking via Socket.IO, and exportable reports.

## 🚀 Features

- 🔐 JWT Authentication with Access & Refresh tokens
- 👥 Role-based Access Control (Admin, Customer, Agent)
- 📦 Parcel CRUD operations
- 📤 Assign Agents to Parcels
- 🌐 CORS & environment-based configuration
- ✅ RESTful API with Postman Collection

---
## 🔐 Authentication & Roles
   - **Admin: Full access (CRUD users, assign agents, reports, metrics)**
   - **Customer: Create/view their parcels**
   - **Agent: View assigned parcels, update delivery status, share live location**
   
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

### 📦 Create .env file

    ```bash
    PORT=8000
    MONGO_URI=mongodb+srv://msovi480:msovi480@cluster0.nxb6oce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=bff32ead770bb6e9134caf8b1692f8f26bb60cf33db06b9a8d36bbd6cc743f8a82146b798f97641a66c356a70574cb1474ad42d2b48b20752751a1ca89e4bab7


### 📦 Start the Server

    ```bash
    pnpm dev
    # or
    npm run dev

