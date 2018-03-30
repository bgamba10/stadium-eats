import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import RestaurantList from "../components/restaurants/RestaurantList.jsx";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }
  logoutThis(e) {
    e.preventDefault();
    this.props.logout(e);
  }


  render() {
    let currentUser = this.props.currentUser;
    console.log(currentUser, "porque");
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    console.log("jijueputa");
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-md  navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Stadium Eats</a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <a href="#" className="nav-link">Home</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="#"> Orders </a>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link"> Restaurants</a>
              </li>

            </ul>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav navbar-right">
                <a className="nav-item nav-link " href="#" onClick={this.logoutThis.bind(this)}>Logout</a>
              </div>
            </div>
          </nav>
        </div>
        <div className="container">
          <h1 className="text-center">{loggedIn ? "Welcome " + this.props.currentUser : ""}</h1>
        </div>
        <div>
          <RestaurantList />
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  username: PropTypes.string
};