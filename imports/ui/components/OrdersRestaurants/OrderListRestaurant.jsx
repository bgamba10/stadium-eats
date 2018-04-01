import React from "react";
import { Orders } from "../../../api/orders";
import { withTracker } from "meteor/react-meteor-data";
import { OrderDetailRestaurant } from "../../components/OrdersRestaurants/OrderDetailRestaurant";
class OrderListRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderState: ""
    }
  }

  onChange(idOr, stateO) {

    console.log(idOr, stateO)
    Meteor.call("orders.changeState", idOr, stateO);

  }

  changeOrderState(e) {
    e.preventDefault();
    oState = e.target.value;
    console.log(oState);
    this.setState({
      orderState: oState
    });
    sessionStorage.setItem("oState", oState);
  }

  renderOrder() {
    if(this.state.orderState === "") {
      return (
        <div className="container">
          {this.props.orders.map((d, i) =>
            <OrderDetailRestaurant
              plates={d.items}
              state={d.state}
              date={d.createdAt.toString()}
              price={d.price}
              restName={d.restaurantName}
              idOrder={d._id}
              username={d.userName}
              key={i}
              onChange={this.onChange.bind(this)} />
          )}
        </div>
      );
    } else if(this.state.orderState === "order received") {
      return (
        <div className="container">
          {this.props.ordersReceived.map((d, i) =>
            <OrderDetailRestaurant
              plates={d.items}
              state={d.state}
              price={d.price}
              date={d.createdAt.toString()}
              restName={d.restaurantName}
              idOrder={d._id}
              username={d.userName}
              key={i}
              onChange={this.onChange.bind(this)} />
          )}
        </div>
      );
    } else if(this.state.orderState === "delivering") {
      return (
        <div className="container">
          {this.props.ordersDelive.map((d, i) =>
            <OrderDetailRestaurant
              plates={d.items}
              state={d.state}
              price={d.price}
              restName={d.restaurantName}
              idOrder={d._id}
              date={d.createdAt.toString()}
              username={d.userName}
              key={i}
              onChange={this.onChange.bind(this)} />
          )}
        </div>
      );
    } else if(this.state.orderState === "preparing") {
      return (
        <div className="container">
          {this.props.ordersPrep.map((d, i) =>
            <OrderDetailRestaurant
              orderId={d._id}
              plates={d.items}
              state={d.state}
              date={d.createdAt.toString()}
              price={d.price}
              restName={d.restaurantName}
              idOrder={d._id}
              username={d.userName}
              key={i}
              onChange={this.onChange.bind(this)} />
          )}
        </div>

      );
    }
  }


  render() {
    console.log(this.props.orders);
    console.log(this.props.ordersFilter);
    console.log(this.state);
    return (
      <div className="container">
        <div className="row">
          <h3>Your Orders:</h3>
        </div>
        <div>
          <label htmlFor="">Filter Orders by:</label>
        </div>
        <div>
          <select className="custom-select wid" value={this.state.orderState} onChange={this.changeOrderState.bind(this)}>
            <option value="order received">Order Received</option>
            <option value="preparing">Preparing</option>
            <option value="delivering">Delivering</option>
            <option value=""> No Filter </option>
          </select>
          <hr />
        </div>
        <div>
          {this.renderOrder()}
        </div>


      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("orders");
  let owner = sessionStorage.getItem("username");
  let s = sessionStorage.getItem("oState");
  console.log(s, "soy s");
  return {
    orders: Orders.find({ restaurantName: owner }, { sort: { createdAt: -1 } }).fetch(),
    ordersPrep: Orders.find({ state: "preparing" }, { sort: { createdAt: -1 } }).fetch(),
    ordersDelive: Orders.find({ state: "delivering" }, { sort: { createdAt: -1 } }).fetch(),
    ordersReceived: Orders.find({ state: "order received" }, { sort: { createdAt: -1 } }).fetch()
  };
})(OrderListRestaurant);