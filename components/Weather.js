import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { blue } from "../utils/colors";

export const Weather = props => {
  const { temperature, icon, summary } = props;
  return (
    <View>
      <Text style={styles.header}>WEATHER</Text>
      <View style={styles.content}>
        <Text style={styles.temp}>{temperature}</Text>
        <View>
          <Text>{icon}</Text>
        </View>
        <View>
          <Text>{summary}</Text>
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
    fontSize: 40,
    fontWeight: "bold"
  }
});
