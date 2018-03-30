import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// containers
import App from "./ui/App.jsx";


// pages
import SignupPage from "./ui/pages/SingupPage.jsx";
import LoginPage from "./ui/pages/LoginPage.jsx";
import HomePage from "./ui/pages/HomePage.jsx";
import SignupRestaurant from "./ui/pages/SingupRestaurant.jsx";
import { RestaurantDetail } from "./ui/components/restaurants/RestaurantDetail.jsx";
import MyMenu from "./ui/components/restaurants/MyMenu.jsx";

export const AppRoutes = () => (
  <Router>
    <div>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/restaurantDetail" component={RestaurantDetail} />
      <Route path="/signupRestaurant" component={SignupRestaurant} />
      <Route path="/Home" component={HomePage} />
      <Route path="/myMenu" component={MyMenu} />
      <Route exact={true} path="/" component={App} />
    </div>
  </Router>
);
