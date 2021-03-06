import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Orders = new Mongo.Collection("orders");

if(Meteor.isServer) {
  Meteor.publish("orders", function ordersPublication() {
    return Orders.find();
  });
}

Meteor.methods({
  "orders.insert"(prods, total, resName, username, locationT) {
    if(!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Orders.insert({
      items: prods,
      price: total,
      sector: locationT.sector,
      stand: locationT.stand,
      row: locationT.row,
      sitnum: locationT.sitnum,
      clientId: this.userId,
      userName: username,
      restaurantName: resName,
      state: "order received",
      createdAt: new Date()
    });
  },
  "orders.changeState"(idOrder, stateOr) {
    Orders.update({ _id: idOrder },
      {
        $set: {
          state: stateOr
        }
      });
  }
});