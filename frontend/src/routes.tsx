import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./screens/LoginPage";
import { LandingPage } from "./screens/LandingPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage initialMode="login" />} />
        <Route path="/login" element={<LandingPage initialMode="login" />} />
        <Route path="/register" element={<LandingPage initialMode="register" />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

