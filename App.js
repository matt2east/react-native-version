import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.home}>
          <Text style={styles.howdy}>HOWDY!</Text>
          <Text style={styles.intro}>
            Let's find your location for the most accurate air quality, pollen,
            and weather information.
          </Text>
          <TouchableHighlight style={styles.btn}>
            <Text style={styles.btnText}>CURRENT LOCATION</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn}>
            <Text style={styles.btnText}>SEARCH ZIPCODE</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4169e1",
    alignItems: "center",
    justifyContent: "center"
  },
  home: {
    backgroundColor: "#fff",
    height: 450,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  howdy: {
    color: "#4169e1",
    fontSize: 25,
    fontWeight: "bold",
    margin: 30
  },
  intro: {
    textAlign: "center",
    margin: 20,
    width: 250,
    fontSize: 20
  },
  btn: {
    borderStyle: "solid",
    borderColor: "#d5d5d5",
    borderWidth: 1,
    backgroundColor: "#4169e1",
    borderRadius: 5,
    padding: 5,
    width: 250,
    margin: 10
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  }
});
