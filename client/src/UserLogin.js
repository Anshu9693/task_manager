import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/user/login`, {
        email,
        password,
      });
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        navigate("/tasks");
        toast.success("Login successful!");
      } else {
        toast.error("Login failed. Please check your credentials and try again.");
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <form
        className="bg-white p-4 rounded shadow"
        style={{ minWidth: 320, maxWidth: 350, width: "100%" }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 className="mb-3 text-center text-primary fw-bold">Login</h2>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary h-10 w-100 fw-bold" type="submit">
          Login
        </button>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <button onClick={() => navigate("/")} className="btn btn-link">
            Sign Up
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default UserLogin;
