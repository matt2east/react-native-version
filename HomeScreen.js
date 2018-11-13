import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Button
} from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.home}>
          <Image
            style={styles.imgTexas}
            source={require("./assets/texas.png")}
          />
          <Text style={styles.howdy}>HOWDY!</Text>
          <Text style={styles.intro}>
            Let's find your location for the most accurate air quality, pollen,
            and weather information.
          </Text>
          <TouchableHighlight style={styles.btn}>
            <Button
              title="CURRENT LOCATION"
              style={styles.btnText}
              onPress={() => navigate("CurrentLoc")}
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn}>
            <Text style={styles.btnText}>SEARCH ZIPCODE</Text>
          </TouchableHighlight>
        </View>
        <Image style={styles.imgCAF} source={require("./assets/CAF.png")} />
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
  imgTexas: {
    width: 100,
    height: 100,
    marginTop: 20
  },
  howdy: {
    color: "#4169e1",
    fontSize: 25,
    fontWeight: "bold",
    margin: 15
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
  },
  imgCAF: {
    height: 100,
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: 150
  }
});
