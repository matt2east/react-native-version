import React from "react";
import HomeScreen from "./components/HomeScreen";
import CurrentLoc from "./components/CurrentLoc";

import { createStackNavigator } from "react-navigation";

const App = createStackNavigator({
  Home: HomeScreen,
  CurrentLoc: CurrentLoc
});

export default App;
