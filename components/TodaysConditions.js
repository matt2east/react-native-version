import React from "react";
import { View, Text, Button } from "react-native";

class TodaysConditions extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View>
        <Text>Today's Conditions</Text>
        <View>
          <Text>AIR QUALITY</Text>
          <Text>The air quality index is currently:</Text>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
      </View>
    );
  }
}

export default TodaysConditions;
