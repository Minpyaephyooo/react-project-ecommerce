import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
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
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={onChangeInput}
          value={user.name}
          required
        />
        <input
          type="email"
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
        <button type="submit">Register</button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default Register;
