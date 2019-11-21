import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";

import BetList from "../Components/betList";
import background from "../Media/2.jpg";

class storesScreen extends Component {
  state = {
    nameStore: "",
    games: []
  };
  componentWillMount() {
    this.getInfoStore();
    this.getGamesStore();
  }
  render() {
    return (
      <ImageBackground
        source={background}
        blurRadius={3}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.nameStore}</Text>
          <BetList style={styles.list} games={this.state.games} />
          <TouchableHighlight style={styles.button} onPress={this.goToTab}>
            <Text style={styles.textButton}>Volver</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
  goToTab = async () => {
    this.props.navigation.navigate("Tab");
  };
  getInfoStore = async () => {
    await fetch(global.url + `store?id=${this.props.datosRedux.storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ nameStore: responseData.name });
      })
      .catch(error => {
        return console.error(error);
      });
  };
  getGamesStore = async () => {
    await fetch(global.url + `games?id=${this.props.datosRedux.storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ games: responseData.data });
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
    alignItems: "center",
    height: "100%"
  },
  button: {
    backgroundColor: "rgb(41, 161, 156)",
    borderRadius: 8,
    padding: 10,
    bottom: 5,
    marginVertical: 10,
    width: "100%"
  },
  textButton: {
    textAlign: "center",
    color: "rgb(163, 247, 191)",
    fontSize: 20
  }
});
