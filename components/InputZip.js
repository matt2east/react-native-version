import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  AsyncStorage,
  Alert,
  Image
} from "react-native";
import t from "tcomb-form-native";
import { AirQuality } from "./AirQuality";
import { Weather } from "./Weather";

var isValidZip = require("is-valid-zip");
const Form = t.form.Form;
const Zip = t.struct({
  zipcode: t.maybe(t.String)
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: "blue",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    },

    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    }
  }
};

const options = {
  fields: {
    zipcode: {
      error: "Please enter your zip code."
    }
  },
  stylesheet: formStyles
};

class InputZip extends Component {
  constructor(props) {
    super(props);
    this.state = { zipcode: "" };
  }

  handleSubmit = () => {
    const value = this._form.getValue();

    this.setState({ zipcode: value.zipcode }, () => {
      let zipValue = this.state.zipcode;
      if (isValidZip(zipValue)) {
        let zippy_object = {
          zipKey: zipValue
        };
        AsyncStorage.setItem("zippy", JSON.stringify(zippy_object), () => {
          AsyncStorage.getItem("zippy", (err, result) => {
            console.log(result);
            if (err) console.log(err);
          });
          this.props.navigation.navigate("TodayZipData");
        });
      } else {
        console.log("not valid zip code");
        Alert.alert(
          "Not a valid zip code.",
          "Please enter a valid zip code.",
          [
            {
              text: "OK",
              onPress: () => this.props.navigation.navigate("InputZip")
            }
          ],
          { cancelable: false }
        );
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Form ref={c => (this._form = c)} type={Zip} options={options} />
        <Button title="Go!" onPress={this.handleSubmit} />
        {/* <Text>{this.state.zipcode}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff"
  }
});

export default InputZip;
