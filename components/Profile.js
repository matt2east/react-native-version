import React, { Component } from 'react';
import { Text, View,  AsyncStorage, Image } from 'react-native';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0};
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
        console.log(badgePoints)
        this.setState({
            count: this.state.count + badgePoints
          });
      }
  render() {
    const counterState = this.state.count;
    let cactusBadge;
    let batBadge
    if (counterState => 5) {
      cactusBadge = (
        <Image
          style={{ width: 120, height: 100 }}
          source={require("../assets/badges/cactus.png")}
        />
      );
    }
    if (counterState => 10) {
      batBadge = (
        <Image
          style={{ width: 120, height: 100 }}
          source={require("../assets/badges/bat.png")}
        />
      );
    }
    return (
      <View>
        <Text>Profile Component</Text>
        <Text>Total Badge Points: {this.state.count}</Text>
        {cactusBadge}
        {batBadge}
      </View>
    );
  }
}

export default Profile;