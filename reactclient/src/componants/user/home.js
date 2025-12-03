import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
    const { user } = useAuth();
    console.log("User data in Home:", user);
    const handleLogout = () => {
        // Clear local storage and any other logout logic
        localStorage.clear();
        window.location.href = '/login'; // Redirect to login page
    }

  return (
    <div>
             {/* logout button that clear the local storage */}
            <button onClick={handleLogout}>Logout</button>
      <h1>Welcome to the User Home Page</h1>
        <h2>Hello, {user ? user.username : 'Guest'}!</h2>
      <p>This is the home page for users.</p>
    </div>
  );
};

export default Home;