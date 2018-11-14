import React from "react";
import HomeScreen from "./components/HomeScreen";
import ForeCast from "./components/ForeCast";

import { createStackNavigator } from "react-navigation";

const App = createStackNavigator({
  Home: HomeScreen,
  ForeCast: ForeCast
});

export default App;
