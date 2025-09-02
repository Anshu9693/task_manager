import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserSignup = () => {
const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [   fname, setFname ] = useState('')
  const [ lname, setLname ] = useState('')

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      fname,
      lname
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/user/register`, newUser);
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        navigate('/tasks');
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="text-center mb-4 text-primary">User Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name</label>
            <input
              type="text"
              name="fname"
              value={fname}
              onChange={e => setFname(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              type="text"
              name="lname"
              value={lname}
              onChange={e => setLname(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold py-2">Sign Up</button>   
        </form>
        <p>
  Already have an account?
  <button onClick={() => navigate("/login")} className="btn btn-link">Login</button>
</p>
       
      </div>
    </div>
  );
};

export default UserSignup;
