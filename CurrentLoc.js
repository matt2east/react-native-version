import React from "react";
import { Platform, View, Text } from "react-native";
import { Constants, Location, Permissions } from "expo";
import fetchData from "./utils/api.js";
import axios from "axios";

class CurrentLoc extends React.Component {
  state = {
    data: [],
    location: null,
    errorMessage: null,
    address: {}
  };

  _getLocationsAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied."
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    const { latitude, longitude } = await location.coords;
    let [address] = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });

    this.setState({
      address
    });
    console.log(this.state.address);
  };

  async componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationsAsync();
      let currentDate = new Date();
      currentDate = currentDate.toISOString().split("T")[0];
      const encodedURI = window.encodeURI(
        `http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=${
          this.state.address.postalCode
        }&date=${currentDate}&distance=25&API_KEY=98394834-0971-40F7-82FE-8752A5FA0D51`
      );
      const { data } = await axios.get(encodedURI);
      this.setState({
        data
      });
    }
  }

  render() {
    let text = "Waiting...";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = "This is your forecast:";
    }
    return (
      <View>
        <Text>{text}</Text>
        {/* <Text>{JSON.stringify(this.state.data, null, 2)}</Text> */}
        <Text>{JSON.stringify(this.state, null, 2)}</Text>
      </View>
    );
  }
}

export default CurrentLoc;
