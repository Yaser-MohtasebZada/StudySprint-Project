// src/LoginPage.jsx

import React from 'react';
import './LoginPage.css';

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login feature is not functional as per initial project design (no logins).");
  };

  return (
    <div className="login-container">
      <h1>StudySprint Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>
      <p className="no-login-note">
        Note: The project design intended StudySprint to be a minimalist tool with no required user logins for deep work. This page is a placeholder.
      </p>
    </div>
  );
}