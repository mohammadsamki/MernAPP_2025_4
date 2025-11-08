import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
    const { user } = useAuth();
    console.log("User data in Home:", user);

  return (
    <div>
      <h1>Welcome to the User Home Page</h1>
        <h2>Hello, {user ? user.username : 'Guest'}!</h2>
      <p>This is the home page for users.</p>
    </div>
  );
};

export default Home;