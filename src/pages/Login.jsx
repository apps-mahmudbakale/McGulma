import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zcjxkiumbmmqeetouwrq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjanhraXVtYm1tcWVldG91d3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NzgwODQsImV4cCI6MjA1NDU1NDA4NH0.dXF58HghMOt4Be9q51_3L8wPFLmtmVmMZWNNl9egL7Y"
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Fetch user from Supabase
    const { data: users, error } = await supabase
      .from("users")
      .select("id, email, password")
      .eq("email", email)
      .single();

    if (error || !users) {
      alert("User not found.");
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      alert("Incorrect password.");
      return;
    }

    // Save user ID in localStorage (or use JWT)
    localStorage.setItem("user_id", users.id);
    alert("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

      <form onSubmit={handleLogin} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      
    </div>
  </div>
  );
};

export default Login;
