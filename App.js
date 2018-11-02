import React from "react";
import HomeScreen from "./HomeScreen";
import CurrentLoc from "./CurrentLoc";

import { createStackNavigator } from "react-navigation";

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  CurrentLoc: { screen: CurrentLoc }
});

export default App;
