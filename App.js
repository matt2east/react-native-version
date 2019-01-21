import React from "react";
import HomeScreen from "./components/HomeScreen";
import ForeCast from "./components/ForeCast";
import InputZip from "./components/InputZip";
import TodayZipData from "./components/TodayZipData";
import UpcomingZipData from "./components/UpcomingZipData";
import BadgePoints from "./components/BadgePoints";

import { createStackNavigator } from "react-navigation";

const App = createStackNavigator({
  Home: HomeScreen,
  ForeCast: ForeCast,
  InputZip: InputZip,
  TodayZipData: TodayZipData,
  UpcomingZipData: UpcomingZipData,
  BadgePoints: BadgePoints
});

export default App;
