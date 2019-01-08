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

class UpcomingZipData extends React.Component {
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

      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      var nextDay = new Date(dateObj);
      nextDay.setDate(dateObj.getDate() + 1);

      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      var newdate = year + "-" + month + "-" + day;
      var tomorrowMonth = nextDay.getUTCMonth() + 1;
      var tomorrowDay = nextDay.getUTCDate();
      var tomorrowYear = nextDay.getUTCFullYear();
      if (tomorrowMonth < 10) {
        tomorrowMonth = "0" + tomorrowMonth;
      }
      if (tomorrowDay < 10) {
        tomorrowDay = "0" + tomorrowDay;
      }
      var tomorrow = tomorrowYear + "-" + tomorrowMonth + "-" + tomorrowDay;

      const zip = await this.getZip();
      //Get latitude / longitude api data to use in darksky Weather api
      const encodedURILatLng = window.encodeURI(
        `https://www.zipcodeapi.com/rest/${ZIP_CODE_API}/info.json/${zip}/degrees`
      );
      const latLongData = await axios.get(encodedURILatLng);
      const latitude = latLongData.data.lat;
      const longitude = latLongData.data.lng;

      //Get Weather
      const encodedURIWeather = window.encodeURI(
        `https://api.darksky.net/forecast/${WEATHER_API}/${latitude},${longitude}`
      );
      //Get Air Quality
      const encodedURI = window.encodeURI(
        `http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=${zip}&date=${tomorrow}&distance=25&API_KEY=${AIR_NOW_API}`
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
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTab}>Tomorrow's Conditions</Text>
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
                  Number(
                    Math.floor(this.state.weather.daily.data[0].temperatureHigh)
                  )
                )}
                icon={this.state.weather.daily.icon}
                summary={this.state.weather.daily.summary}
              />
            </View>
          )}
          <Button
            title="Today's Conditions"
            onPress={() => this.props.navigation.navigate("TodayZipData")}
          />
        </View>
      </View>
    );
  }
}
export default UpcomingZipData;

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
