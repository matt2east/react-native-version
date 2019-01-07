import React from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  AsyncStorage,
  Button,
  StyleSheet
} from "react-native";
import axios from "axios";
import { AIR_NOW_API, WEATHER_API, ZIP_CODE_API } from "../utils/secret.js";

class TodayZipData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airQuality: "",
      temperature: "",
      weather: ""
    };
  }

  getZip = async () => {
    try {
      const result = await AsyncStorage.getItem("zippy");
      if (result) {
        const zipObj = JSON.parse(result);
        return zipObj.zipKey;
      }
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    try {
      String.prototype.unquoted = function() {
        return this.replace(/(^")|("$)/g, "");
      };
      //takes off quotes from String

      const dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      const newdate = year + "-" + month + "-" + day;
      const zip = await this.getZip();

      //get latitude / longitude api data to use in darksky Weather api
      const encodedURILatLng = window.encodeURI(
        `https://www.zipcodeapi.com/rest/${ZIP_CODE_API}/info.json/${zip}/degrees`
      );
      const latLongData = await axios.get(encodedURILatLng);
      const latitude = latLongData.data.lat;
      const longitude = latLongData.data.lng;

          // Get Weather
    const encodedURIWeather = window.encodeURI(
      `https://api.darksky.net/forecast/${WEATHER_API}/${latitude},${longitude}`
    );
    const weatherData = await axios.get(encodedURIWeather);
    const temperature = Math.floor(weatherData.data.currently.temperature);
    const weather = weatherData.data.currently.summary;
    console.log(weather)
    
      //get airnow api data
      const encodedURI = window.encodeURI(
        `http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=${zip}&date=${newdate}&distance=25&API_KEY=${AIR_NOW_API}`
      );
      const { data } = await axios.get(encodedURI);
      const aqdata = JSON.stringify(data[0].Category.Name);
      const airQuality = aqdata.unquoted();
      this.setState({
        airQuality: airQuality,
        temperature: temperature,
        weather: weather
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { airQuality} = this.state;
    return (
      <View>
        <Text style={styles.headerTab}>Today's Conditions</Text>
        <Text style={styles.header}>AIR QUALITY</Text>
        <Text>{`\n`}</Text>
        <Text>The air quality index is currently: {airQuality}</Text>
        <Button
          title="Forecast Conditions"
          onPress={() => this.props.navigation.navigate("UpcomingZipData")}
        />
      </View>
    );
  }
}
export default TodayZipData;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    backgroundColor: "#4169e1",
    color: "#fff",
    margin: 0,
    padding: 0,
    height: 40
  },
  content: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    height: 200
  },
  aqi: {
    width: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  aqiNumber: {
    fontSize: 40,
    fontWeight: "bold"
  },
  reading: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  readingText: {
    fontSize: 14
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  headerTab: {
    fontSize: 20
  }
});
