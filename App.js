import React from "react";
import HomeScreen from "./components/HomeScreen";
import ForeCast from "./components/ForeCast";
import InputZip from "./components/InputZip";
import TodayZipData from "./components/TodayZipData";
import UpcomingZipData from "./components/UpcomingZipData";
import AddBadgePoints from "./components/AddBadgePoints";
import Menu from "./components/Menu";
import Profile from "./components/Profile";


import { createStackNavigator } from "react-navigation";

const App = createStackNavigator({
  Home: HomeScreen,
  ForeCast: ForeCast,
  InputZip: InputZip,
  TodayZipData: TodayZipData,
  UpcomingZipData: UpcomingZipData,
  AddBadgePoints: AddBadgePoints,
  Menu: Menu,
  Profile: Profile
});

export default App;
