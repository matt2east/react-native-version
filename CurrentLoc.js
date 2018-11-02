import React from "react";
import { View, Text } from "react-native";
import getMoviesFromApi from "./utils/api.js";

class CurrentLoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  async componentDidMount() {
    const data = await getMoviesFromApi();
    this.setState({ movies: data });
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
