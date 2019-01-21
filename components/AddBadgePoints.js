import React, { Component } from "react";
import {
  Text,
  Alert,
  Button,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import Profile from './Profile';

class AddBadgePoints extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, disabled: false };
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
    });
    console.log(this.state.count);
  }
  incrementCount = () => {
    let badgeValue = this.state.count;
    let badge_object = {
      badgeKey: badgeValue
    };
    AsyncStorage.setItem("badgeCount", JSON.stringify(badge_object), () => {
      this.setState({
        count: this.state.count + 1,
        disabled: true
      });
      AsyncStorage.getItem("badgeCount", (err, result) => {
        console.log(result);
        if (err) console.log(err);
        console.log(this.state.count);
        Alert.alert(
          "You did the challenge.",
          "Great job!",
          [
            {
              text: "OK",
              onPress: () => console.log("Challenge Alert pressed.")
            }
          ],
          { cancelable: true }
        );
      });
    });
  };

  render() {
    return (
      <View>
        <Button
          disabled={this.state.disabled}
          onPress={this.incrementCount}
          title="Today's Challenge"
        />
        ;
      </View>
    );
  }
}

export default AddBadgePoints;
