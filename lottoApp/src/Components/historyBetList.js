import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";

import HistoryBet from "./historyBet";

export default class historyBetList extends Component {
  renderHistorys = historys => {
    return historys.map((item, index) => {
      return (
        <HistoryBet
          key={index}
          idGame={item.idGame}
          amount={item.amount}
          winner={item.winner}
          number={item.number}
        />
      );
    });
  };
  render() {
    return (
      <ScrollView style={styles.list}>
        {this.renderHistorys(this.props.historys)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: "100%"
  }
});
