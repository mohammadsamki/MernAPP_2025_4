//  create normal dashboard for admin
import React from 'react';

export default function Dashboard() {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };
    // create crud table for the user management
    return (
        <div>
            {/* logout button that clear the local storage */}
            <button onClick={handleLogout}>Logout</button>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage the application.</p>
        </div>
    );
}