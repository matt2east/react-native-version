import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const AirQuality = props => {
  const { aqi, name } = props;
  return (
    <View>
      <Text style={styles.header}>AIR QUALITY</Text>
      <View style={styles.content}>
        <View style={styles.aqi}>
          <Text style={styles.aqiNumber}>{aqi}</Text>
        </View>
        <View style={styles.reading}>
          <Text style={styles.readingText}>
            The air quality index is currently:
          </Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        {/* <ScrollView>
                  <Text>{JSON.stringify(this.state.data, null, 2)}</Text>
                </ScrollView> */}
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
    marginTop: 10,
    height: 200
  },
  aqi: {
    backgroundColor: "pink",
    width: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  aqiNumber: {
    fontSize: 30,
    fontWeight: "bold"
  },
  reading: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  readingText: {
    fontSize: 14
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  }
});
