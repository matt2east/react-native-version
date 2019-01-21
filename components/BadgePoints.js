import React, { Component } from "react";
import { Text, Alert, Button, StyleSheet, View,  AsyncStorage } from "react-native";

class BadgePoints extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isHidden: false };
  }
  incrementCount = () => {
    console.log("incrementCount");
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
    let badgeValue = this.state.count;
    let badge_object = {
        badgeKey: badgeValue
      };
    AsyncStorage.setItem("badgeCount", JSON.stringify(badge_object), () => {
        AsyncStorage.getItem("badgeCount", (err, result) => {
          console.log("badgeCount result is " +result);
          if (err) console.log(err);
        });
      });

  };
  render() {
    return <Button onPress={this.incrementCount} title="Do Challenge!" />;
  }
}

export default BadgePoints;
