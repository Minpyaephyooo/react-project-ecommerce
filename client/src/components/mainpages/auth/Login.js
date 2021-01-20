import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
     e.preventDefault();
     try {
         await axios.post('/user/login', { ...user })
         localStorage.setItem('firstLogin', true)
         window.location.href = '/'
     } catch (err) {
         alert(err.response.data.message)
     }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={onChangeInput}
          value={user.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChangeInput}
          value={user.password}
          required

        />
        <button type="submit">Login</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;
