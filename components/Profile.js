import React, { Component } from 'react';
import { Text, View,  AsyncStorage } from 'react-native';

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
    return (
      <View>
        <Text>Profile Component</Text>
        <Text>{this.state.count}</Text>
      </View>
    );
  }
}

export default Profile;