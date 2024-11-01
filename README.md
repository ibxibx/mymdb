# 🎬 MyMDB - My Movie Database

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://mymdb-app.netlify.app/)

## 📖 Project Overview

MyMDB is a full-stack web application that allows movie enthusiasts to explore, search, and manage their favorite movies. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), this application provides a rich user interface for interacting with movie data while maintaining user preferences and favorites.

## ✨ Key Features

- 🔍 Browse and search through a curated collection of movies
- 📋 View detailed information about movies, including descriptions, genres, and directors
- 👤 Create and manage user profiles
- ⭐ Save favorite movies to your personal list
- 📱 Responsive design that works on both desktop and mobile devices

## 🖥️ Server-Side

### 🛠️ Technologies Used

- 🟢 Node.js
- ⚡ Express.js
- 🍃 MongoDB
- 🔷 Mongoose
- 🔑 JSON Web Token for authentication
- 🔄 CORS
- ✅ Express-validator

### 📡 API Endpoints

#### 🎬 Movies
- `GET /movies` - Get all movies
- `GET /movies/:Title` - Get movie by title
- `GET /genres/:Name` - Get genre details
- `GET /directors/:Name` - Get director details

#### 👥 Users
- `POST /users` - User registration
- `POST /login` - User authentication
- `PUT /users/:Username` - Update user info
- `POST /users/:Username/movies/:MovieID` - Add favorite movie
- `DELETE /users/:Username/movies/:MovieID` - Remove favorite movie
- `DELETE /users/:Username` - Delete user account

## 💻 Client-Side

### 🛠️ Technologies Used

- ⚛️ React
- 🎨 React Bootstrap
- 🔀 React Router
- 📊 Redux (for state management)
- 📦 Parcel (build tool)
- 🔌 Axios for API communication

### 🌟 Features

- 🎨 Responsive Design: Works seamlessly across desktop and mobile devices
- 🔐 User Authentication: Secure login and registration system
- 👤 Profile Management: Users can update their information and manage favorite movies
- 🔍 Search Functionality: Filter movies in real-time
- 🖱️ Interactive UI: Smooth navigation and user-friendly interface

## 📸 Screenshots

![Main View](img/Screenshot1.jpg)
![Profile View](img/Screenshot2.jpg)
![Genre Filter](img/Screenshot3.jpg)
![Director Filter](img/Screenshot4.jpg)

## 🚀 Installation and Setup

### 📋 Prerequisites

- 📌 Node.js (v14 or higher)
- 📌 MongoDB
- 📌 npm or yarn

### ⚙️ Server Setup

1. Clone the repository:
```bash
git clone https://github.com/ibxibx/mymdb.git
cd mymdb
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB connection string and JWT secret:
```
CONNECTION_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

### 🖥️ Client Setup

1. Switch to the client branch:
```bash
git checkout clean-mymdb-client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your API URL:
```
REACT_APP_API_URL=your_api_url
```

4. Start the development server:
```bash
npm start
```

### 📦 Building for Production

To build the project for production, run:
```bash
npm run build
```

This will create a `dist/` directory with the compiled and optimized files ready for deployment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
