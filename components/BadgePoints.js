import React, { Component } from "react";
import { Text, Alert, Button, StyleSheet, View } from "react-native";

class BadgePoints extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isHidden: false };
  }
  incrementCount = () => {
    console.log("incrementCount");
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
  };
  render() {
    return <Button onPress={this.incrementCount} title="Do Challenge!" />;
  }
}

export default BadgePoints;
