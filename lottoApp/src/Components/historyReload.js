import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

export default class historyBet extends Component {
  state = {
    storeName: "",
    address: "",
    hour: "",
    minutes: "",
    day: "",
    month: "",
    year: ""
  };
  componentDidMount() {
    this.getInfoStore();
    this.convertDateTime();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`Recarga en ${this.state.storeName}`}</Text>
        <Text style={styles.text}>{`Dirección: ${this.state.address}`}</Text>
        <Text style={styles.text}>{`Monto: ${this.props.amount}`}</Text>
        <Text
          style={styles.text}
        >{`Fecha: ${this.state.day}/${this.state.month}/${this.state.year}`}</Text>
        <Text
          style={styles.text}
        >{`Hora: ${this.state.hour}:${this.state.minutes}`}</Text>
      </View>
    );
  }
  convertDateTime = async () => {
    let datetime = new Date(this.props.dateTime * 1000); //Firebase guarda el datatime en segundos
    let day = datetime.getDate();
    let month = datetime.getMonth();
    let year = datetime.getFullYear();
    let hour = datetime.getHours();
    let minutes = datetime.getMinutes();
    this.setState({ day: day });
    this.setState({ month: month });
    this.setState({ year: year });
    this.setState({ hour: hour });
    this.setState({ minutes: minutes });
  };
  getInfoStore = async () => {
    await fetch(global.url + `store?id=${this.props.idStore}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ storeName: responseData.name });
        this.setState({ address: responseData.address });
      })
      .catch(error => {
        return console.error(error);
      });
  };
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "rgb(161, 165, 198)",
    fontSize: 16,
    padding: 1
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(34, 40, 49)",
    width: "100%",
    padding: "5%",
    paddingVertical: "2%",
    borderRadius: 8,
    marginVertical: "2%"
  }
});
