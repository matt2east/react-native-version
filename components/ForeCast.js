import React from "react";
import { Platform, View, Text, ScrollView, StyleSheet } from "react-native";
import { Constants, Location, Permissions } from "expo";
import axios from "axios";
import { AIR_NOW_API, WEATHER_API } from "../utils/secret.js";
import { AirQuality } from "./AirQuality.js";

class ForeCast extends React.Component {
  state = {
    errorMessage: null,
    location: null,
    postalCode: null,
    aqi: [],
    weather: {}
  };

  _getLocationsAndDataAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied."
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = await location.coords;
    const [address] = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });
    const { postalCode } = address;

    this.setState({
      location,
      postalCode
    });

    // Get AirNow data
    let currentDate = new Date();
    currentDate = currentDate.toISOString().split("T")[0];
    const encodedURI = window.encodeURI(
      `http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=${postalCode}&date=${currentDate}&distance=25&API_KEY=${AIR_NOW_API}`
    );

    // Get Weather
    const encodedURIWeather = window.encodeURI(
      `https://api.darksky.net/forecast/${WEATHER_API}/${latitude},${longitude}`
    );

    axios
      .all([axios.get(encodedURI), axios.get(encodedURIWeather)])
      .then(
        axios.spread((aqiRes, weatherRes) => {
          const aqi = aqiRes.data;
          const weather = weatherRes.data;
          this.setState({
            aqi,
            weather
          });
        })
      )
      .catch(err => console.log(err));
  };

  componentDidMount() {
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
      text = "Today's Conditions";
    }
    console.log(this.state);
    return (
      <View style={styles.container}>
        {/* <View>
          <Text style={styles.headerTab}>{text}</Text>
          {!this.state.data[0] ? (
            <Text style={styles.header}>AIR QUALITY</Text>
          ) : (
            <View>
              <AirQuality
                aqi={this.state.data[0].AQI}
                name={this.state.data[0].Category.Name.toUpperCase()}
              />
              <View>{JSON.stringify(this.state.weather, null, 2)}</View>
            </View>
          )}
        </View> */}
        <View>{JSON.stringify(this.state.location, null, 2)}</View>
        {/* <View>{JSON.stringify(this.state.weather, null, 2)}</View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  headerTab: {
    fontSize: 20
  },
  header: {
    fontSize: 25,
    backgroundColor: "#4169e1",
    color: "#fff",
    margin: 0,
    padding: 0,
    height: 40
  }
});

export default ForeCast;
