import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class store extends Component {
  state = {
    name: "",
    address: ""
  };
  componentWillMount() {
    this.getInfoStore();
  }
  render() {
    return (
      <View>
        <TouchableHighlight style={styles.button} onPress={this.selectStore}>
          <View>
            <Text style={styles.textButton}>{this.state.name}</Text>
            <Text
              style={styles.textButton}
            >{`Direccion: ${this.state.address}`}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  getInfoStore = async () => {
    await fetch(global.url + `store?id=${this.props.idStore}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ name: responseData.name });
        this.setState({ address: responseData.address });
      })
      .catch(error => {
        return console.error(error);
      });
  };

  selectStore = async () => {
    this.props.addId(this.props.idStore);
    this.props.navigation.navigate("Games");
  };
}

const mapStateToProps = state => {
  return {
    datosRedux: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addId: idStore => dispatch({ type: "ADD_STORE_ID", payload: idStore })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(store));

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(41, 161, 156)",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    width: "100%"
  },
  textButton: {
    textAlign: "center",
    color: "rgb(163, 247, 191)",
    fontSize: 20
  }
});
