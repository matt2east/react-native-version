import React from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  AsyncStorage,
  Button
} from "react-native";
import axios from "axios";
import { AIR_NOW_API, WEATHER_API } from "../utils/secret.js";

class UpcomingZipData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airQuality: ""
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
      const encodedURI = window.encodeURI(
        `http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=${zip}&date=${tomorrow}&distance=25&API_KEY=${AIR_NOW_API}`
      );
      const { data } = await axios.get(encodedURI);
      const aqdata = JSON.stringify(data[0].Category.Name);
      const airQuality = aqdata.unquoted();
      this.setState({
        airQuality: airQuality
      });
      console.log("tommorow " + data);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { airQuality } = this.state;
    return (
      <View>
        <Text>Forecast Conditions</Text>
        <Button
          title="Today's Conditions"
          onPress={() => this.props.navigation.navigate("FetchExample")}
        />
        <Text>{`\n`}</Text>
        <Text>The air quality index is currently: {airQuality}</Text>
      </View>
    );
  }
}

export default UpcomingZipData;