import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ToastAndroid,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import background from "../Media/1.jpg";
export default class storesScreen extends Component {
  componentDidMount() {
    this.registerForPushNotifications();
  }
  render() {
    return (
      <ImageBackground
        source={background}
        blurRadius={2}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.intro}>Recarga en tu punto de venta</Text>
          <Text style={styles.intro}>Gana jugando lotto</Text>
          <Text style={styles.intro}>Desde de tu celular</Text>
          <TouchableHighlight style={styles.button} onPress={this.goToLogin}>
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
  registerForPushNotifications = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
  };
  goToLogin = async () => {
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(34, 40, 49, 0.8)",
    width: "90%",
    height: "35%",
    padding: "5%",
    borderRadius: 6
  },
  button: {
    borderRadius: 8,
    backgroundColor: "rgb(41, 161, 156)",
    padding: 10,
    marginVertical: 15,
    width: "100%"
  },
  textButton: {
    textAlign: "center",
    color: "rgb(163, 247, 191)",
    fontSize: 20
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  intro: {
    textAlign: "center",
    color: "rgb(161, 165, 198)",
    fontSize: 20,
    padding: 10
  }
});
