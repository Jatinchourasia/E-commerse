import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Footer from "./core/Footer";
import Home from "./core/Home";
import Nav from "./core/Nav";
import Cart from "./core/Cart";

import SignUp from "./user/Signup";
import SignIn from "./user/Signin";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Orders from "./admin/Orders";
import ManageCategories from "./admin/ManageCategory";
import UpdateCategory from "./admin/UpdateCategory";
import AdminInfo from "./admin/AdminInfo";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminInfo} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />{" "}
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoute
          path="/admin/create/products"
          exact
          component={AddProduct}
        />
        <AdminRoute path="/admin/products" exact component={ManageProduct} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute path="/admin/orders" exact component={Orders} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
