import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { blue } from "../utils/colors";

export const Weather = props => {
  const { temperature, icon, summary } = props;
  return (
    <View>
      <Text style={styles.header}>WEATHER</Text>
      <View style={styles.content}>
        <View style={styles.temp}>
          <Text style={styles.tempNumber}>{temperature} &#8457;</Text>
        </View>
        <View style={styles.box}>
          <Text>{icon}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.summary}>{summary}</Text>
        </View>
      </View>
    </View>
  );
};

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
    justifyContent: "space-between",
    marginTop: 10,
    height: 200
  },
  temp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150
  },
  tempNumber: {
    fontSize: 40,
    fontWeight: "bold"
  },
  box: {
    display: "flex",
    justifyContent: "center",
    paddingRight: 20
  },
  summary: {
    fontSize: 20,
    paddingRight: 20
  }
});
