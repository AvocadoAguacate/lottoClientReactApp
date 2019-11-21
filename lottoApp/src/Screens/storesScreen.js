import React, { Component } from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import StoreList from "../Components/storeList";
import background from "../Media/2.jpg";

class storesScreen extends Component {
  state = {
    stores: []
  };
  componentWillMount() {
    this.getStores();
  }
  render() {
    return (
      <ImageBackground
        source={background}
        blurRadius={3}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.text}> Seleciona un punto venta </Text>
          <StoreList style={styles.list} stores={this.state.stores} />
        </View>
      </ImageBackground>
    );
  }
  getStores = async () => {
    await fetch(global.url + `stores?id=${this.props.datosRedux.userInfo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ stores: responseData.data });
      })
      .catch(error => {
        return console.error(error);
      });
  };
}

const mapStateToProps = state => {
  return {
    datosRedux: state
  };
};

export default connect(mapStateToProps)(storesScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(34, 40, 49, 0.8)",
    width: "100%",
    height: "100%",
    padding: "5%",
    borderRadius: 6
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  text: {
    textAlign: "center",
    color: "rgb(161, 165, 198)",
    fontSize: 20,
    padding: 10
  },
  list: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
