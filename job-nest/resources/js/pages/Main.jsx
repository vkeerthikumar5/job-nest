// Main.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <section className="flex min-h-screen flex-col md:flex-row">
      {/* Title Section */}
      <div className="hidden md:flex w-3/4 bg-gradient-to-br from-sky-500 to-violet-600 text-white items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to JobNest</h1>
          <p className="text-lg text-white/90">
          Find, apply, and grow your career with ease. Build your future from the nest today!
          </p>
        </div>
      </div>

      {/* Form Section (will render nested route content) */}
      <div className="w-full flex justify-center items-center">
        <Outlet />
      </div>
    </section>
  );
}
