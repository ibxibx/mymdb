🎥 MyMDB - My Movie Database
MyMDB is a full-stack web application that allows movie enthusiasts to explore, search, and manage their favorite movies. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), this application provides a rich user interface for interacting with movie data while maintaining user preferences and favorites.
🌐 Live Demo
🎯 Project Overview
MyMDB consists of two main parts:

A RESTful API backend server that manages movie data and user authentication
A responsive React-based frontend client that provides an intuitive user interface

⭐ Key Features

Browse and search through a curated collection of movies
View detailed information about movies, including descriptions, genres, and directors
Create and manage user profiles
Save favorite movies to your personal list
Responsive design that works on both desktop and mobile devices

⚙️ Server-Side
🛠️ Technologies Used

Node.js
Express.js
MongoDB
Mongoose
JSON Web Token for authentication
CORS
Express-validator

🔌 API Endpoints
🎬 Movies

GET /movies - Get all movies
GET /movies/:Title - Get movie by title
GET /genres/:Name - Get genre details
GET /directors/:Name - Get director details

👥 Users

POST /users - User registration
POST /login - User authentication
PUT /users/:Username - Update user info
POST /users/:Username/movies/:MovieID - Add favorite movie
DELETE /users/:Username/movies/:MovieID - Remove favorite movie
DELETE /users/:Username - Delete user account

💻 Client-Side
🛠️ Technologies Used

React
React Bootstrap
React Router
Redux (for state management)
Parcel (build tool)
Axios for API communication

🌟 Features

🎨 Responsive Design: Works seamlessly across desktop and mobile devices
🔐 User Authentication: Secure login and registration system
👤 Profile Management: Users can update their information and manage favorite movies
🔍 Search Functionality: Filter movies in real-time
🖱️ Interactive UI: Smooth navigation and user-friendly interface

📸 Screenshots
Show Image
Show Image
Show Image
Show Image
🚀 Installation and Setup
📋 Prerequisites

Node.js (v14 or higher)
MongoDB
npm or yarn

🔧 Server Setup

Clone the repository:

bashCopygit clone https://github.com/ibxibx/mymdb.git
cd mymdb

Install dependencies:

bashCopynpm install

Create a .env file with your MongoDB connection string and JWT secret:

CopyCONNECTION_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the server:

bashCopynpm start
🖥️ Client Setup

Switch to the client branch:

bashCopygit checkout clean-mymdb-client

Install dependencies:

bashCopynpm install

Create a .env file with your API URL:

CopyREACT_APP_API_URL=your_api_url

Start the development server:

bashCopynpm start
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

------------------

# MyMDB - Client Side Part (My Movie Database)

## Live Demo

**🎬 [Access the MyMDB App Here](https://mymdb-app.netlify.app/) 🎬**

## Project Description

MyMDB is a full-stack web application built using the MERN stack (MongoDB, Express, React, and Node.js). It's designed for movie enthusiasts who want to explore, save, and manage information about their favorite films.

## Key Features

- **Browse Movies**: Users can view a comprehensive list of movies, each displayed with an image, title, and brief description.
- **Search and Filter**: The application offers a search feature and allows users to filter movies by genre or director.
- **Detailed Movie Information**: Users can select individual movies to view more detailed information.
- **User Accounts**: New users can register, and existing users can log in to access personalized features.
- **Favorite Movies**: Logged-in users can save movies to their list of favorites and manage this list.
- **Profile Management**: Users can view and update their registration details, as well as deregister if desired.

## Screenshots

### Main View
![Main View](img/Screenshot1.jpg)
*The main view displays all available movies with options to filter and search.*

### Profile View
![Profile View](img/Screenshot2.jpg)
*The profile view shows user details and their list of favorite movies.*

### Genre Filter
![Genre Filter](img/Screenshot3.jpg)
*Users can filter movies by genre using this pop-up in the main view.*

### Director Filter
![Director Filter](img/Screenshot4.jpg)
*The director filter allows users to find movies by a specific director.*

## Technical Details

- **Single-Page Application (SPA)**: Built using React for a seamless user experience.
- **State Routing**: Utilizes React Router for navigation between views and URL sharing.
- **Modern JavaScript**: Written in ES2015+ syntax.
- **Responsive Design**: Uses Bootstrap for a responsive and attractive UI.
- **Build Tool**: Parcel is used as the build tool for efficient bundling and optimization.
- **State Management**: Leverages React's built-in state management with hooks for features like movie filtering.
- **RESTful API Integration**: Communicates with a backend API for data management.
- **Online Hosting**: The application is hosted online for easy access.

## For Developers

If you want to run this project locally or contribute to its development, follow these steps:

### Repository

The project repository is available at: [https://github.com/ibxibx/mymdb/tree/clean-mymdb-client](https://github.com/ibxibx/mymdb/tree/clean-mymdb-client)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/ibxibx/mymdb.git
   cd mymdb
   git checkout clean-mymdb-client
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Project

You can run the project using one of the following commands:

- Using npm:
  ```
  npm start
  ```

- Using Parcel directly:
  ```
  parcel src/index.html
  ```

This will start the development server, and you can view the app in your browser at `http://localhost:1234` (or whichever port Parcel assigns).

### Project Structure

- `src/`: Contains the source code for the React application
  - `components/`: React components
  - `index.html`: The main HTML file
  - `index.jsx`: The entry point for the React application
- `img/`: Contains images used in the README and possibly the application
- `package.json`: Defines the project dependencies and scripts
- `.gitignore`: Specifies files that Git should ignore

### Building for Production

To build the project for production, run:

```
npm run build
```

This will create a `dist/` directory with the compiled and optimized files ready for deployment.

## Getting Started

Open the website in the browser, click Signup to register, Login, and after authentication you can view the movies collection.
Each movie card can be added or removed from favorites, as well as more detailed information can be viewed by clicking "Open".

---

This project was developed as part of a full-stack web development course, demonstrating proficiency in both client-side and server-side technologies.