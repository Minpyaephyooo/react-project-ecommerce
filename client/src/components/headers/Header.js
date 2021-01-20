import React, { useState, useContext } from "react";

import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart

  // console.log(state);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem('firstLogin')
      window.location.href = '/'

   // Redirect('/')
  };

  const adminRouter = () => {
    return (
      <div>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </div>
    );
  };

  const loggedRouter = () => {
    return (
      <div>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </div>
    );
  };

  return (
    <header>
      <div className="menu">
        <img src={Menu} width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin " : "My Website "}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}
        {isLogged ? 
          loggedRouter()
         : 
          <li>
            <Link to="/login">Login / Register</Link>
          </li>
        }

        <li>
          <img src={Close} width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? 
        ""
       : 
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} width="30" />
          </Link>
        </div>
      }
    </header>
  );
};

export default Header;
