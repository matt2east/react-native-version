import React from "react";
import { Platform, View, Text, ScrollView, StyleSheet } from "react-native";
import { Constants, Location, Permissions } from "expo";
import axios from "axios";
import AIR_NOW_API from "../utils/secret.js";
// import TodaysConditions from "./components/TodaysConditions";

class CurrentLoc extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    address: null,
    data: []
  };

  _getLocationsAndDataAsync = async () => {
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
    const { postalCode } = address;

    let currentDate = new Date();
    currentDate = currentDate.toISOString().split("T")[0];
    const encodedURI = window.encodeURI(
      `http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=${postalCode}&date=${currentDate}&distance=25&API_KEY=${AIR_NOW_API}`
    );
    const { data } = await axios.get(encodedURI);
    this.setState({
      address,
      data
    });
  };

  async componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationsAndDataAsync();
    }
  }

  render() {
    let text = "Waiting...";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.address) {
      text = "This is the forecast:";
    }
    return (
      <View>
        <Text>{text}</Text>
        {!this.state.data[0] ? (
          <Text>LOADING</Text>
        ) : (
          <View>
            <Text>AIR QUALITY</Text>
            <Text>{this.state.data[0].DateForecast}</Text>
            <Text>{this.state.data[0].Category.Name}</Text>
            <Text>{this.state.data[0].Category.Number}</Text>
            {/* <ScrollView>
              <Text>{JSON.stringify(this.state.data, null, 2)}</Text>
            </ScrollView> */}
          </View>
        )}
      </View>
    );
  }
}

export default CurrentLoc;
