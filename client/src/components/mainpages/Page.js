import React, {useContext} from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "./utils/NotFound/notFound";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";

import { GlobalState } from '../../GlobalState'

const Page = () => {
    const state = useContext(GlobalState)
    const [ isLogged ] = state.userAPI.isLogged
    const [ isAdmin ] = state.userAPI.isAdmin
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />
      
      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route path="/register" exact component={isLogged ? NotFound : Register} />
      <Route path="/category" component={isAdmin ? Categories : NotFound} />
      <Route path="/create_product" component={isAdmin ? CreateProduct : NotFound} />
      <Route path="/edit_product/:id" component={isAdmin ? CreateProduct : NotFound} />
      <Route path="/cart" exact component={Cart} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
};

export default Page;
