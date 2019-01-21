import React, { Component } from "react";
import {
  Text,
  Alert,
  Button,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";

class BadgePoints extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  getPoints = async () => {
    try {
      const result = await AsyncStorage.getItem("badgeCount");
      if (result) {
        const badgeObj = JSON.parse(result);
        return badgeObj.badgeKey;
      }
    } catch (err) {
      console.log(err);
    }
  };
  async componentDidMount() {
    const badgePoints = await this.getPoints();
    this.setState({
        count: this.state.count + badgePoints
    })
    console.log("badgePoints and state " + this.state.count)
  }
  incrementCount = () => {
    console.log("incrementCount");
    let badgeValue = this.state.count;
    let badge_object = {
      badgeKey: badgeValue
    };
    AsyncStorage.setItem("badgeCount", JSON.stringify(badge_object), () => {
        this.setState({ count: this.state.count + 1 });
      AsyncStorage.getItem("badgeCount", (err, result) => {
        console.log("badgeCount result is " + result);
        if (err) console.log(err);
        console.log(this.state.count);
      });
    });
  };

  render() {
    return (
      <View>
        <Button onPress={this.incrementCount} title="Do Challenge!" />;
      </View>
    );
  }
}

export default BadgePoints;