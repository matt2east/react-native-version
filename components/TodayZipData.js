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
import { AirQuality } from "./AirQuality";
import { Weather } from "./Weather";

class TodayZipData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aqi: [],
      weather: {},
      errorMessage: null
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

      //Get latitude / longitude api data to use in darksky Weather api
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

      //Get Air Quality
      const encodedURI = window.encodeURI(
        `http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=${zip}&date=${newdate}&distance=25&API_KEY=${AIR_NOW_API}`
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
            // console.log(
            //   "the air quality is " + this.state.aqi[0].Category.Name
            // );
            // console.log(
            //   "the weather is " + this.state.weather.currently.summary
            // );
            // console.log(
            //   "the temperature is " +
            //     Math.floor(this.state.weather.currently.temperature)
            // );
          })
        )
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTab}>Today's Conditions</Text>
          {!this.state.aqi[0] ? (
            <Text style={styles.header}>AIR QUALITY</Text>
          ) : (
            <View>
              <AirQuality
                aqi={this.state.aqi[0].AQI}
                name={this.state.aqi[0].Category.Name.toUpperCase()}
              />
              <Weather
                temperature={Math.floor(
                  Number(this.state.weather.currently.temperature)
                )}
                icon={this.state.weather.currently.icon}
                summary={this.state.weather.currently.summary}
              />
            </View>
          )}
          <Button
            title="Tomorrow's Conditions"
            onPress={() => this.props.navigation.navigate("UpcomingZipData")}
          />
        </View>
      </View>
    );
  }
}
export default TodayZipData;

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
