import React, { Component } from "react";
import { Text, Alert, Button, StyleSheet, View } from "react-native";

class BadgePoints extends Component {
  handleSubmit = () => {
    console.log("you pressed the badge button");
  };

  render() {
    return <Button onPress={this.handleSubmit} title="Do Challenge!" />;
  }
}

export default BadgePoints;
