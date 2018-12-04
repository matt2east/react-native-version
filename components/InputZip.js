import React, { Component } from "react";
import { View, StyleSheet, Button, Text, AsyncStorage } from "react-native";
import t from "tcomb-form-native";
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
      console.log(this.state.zipcode);
      let zipValue = this.state.zipcode;
      console.log("zipValue is " + zipValue);
      console.log(isValidZip(zipValue));
      if (isValidZip(zipValue)) {
        console.log("valid zip code");
        let zippy_object = {
          zipKey: zipValue
        };
        AsyncStorage.setItem("zippy", JSON.stringify(zippy_object), () => {
          AsyncStorage.getItem("zippy", (err, result) => {
            console.log(result);
            if (err) console.log(err);
          });
        });
      } else {
        console.log("not valid zip code");
      }
    });
    this.props.navigation.navigate("TodayZipData")
  };

  render() {
    return (
      <View style={styles.container}>
        <Form ref={c => (this._form = c)} type={Zip} options={options} />
        <Button title="Go!" onPress={this.handleSubmit} />
        <Text>{this.state.zipcode}</Text>
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