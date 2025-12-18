import React from "react";
import "../index.css";

export function LoginPage() {
  return (
    <div className="app">
      <div className="login-card">
        <h1 className="login-title">Roblex Admin</h1>
        <p className="login-subtitle">Sign in to manage your project.</p>
        <form className="login-form">
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" name="password" placeholder="••••••••" autoComplete="current-password" />
          </label>
          <button type="submit" className="primary-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

