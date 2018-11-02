import React from "react";
import { View, Text } from "react-native";
import fetchData from "./utils/api.js";

class CurrentLoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({
      data
    });
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state, null, 2)}</Text>
      </View>
    );
  }
}

export default CurrentLoc;
