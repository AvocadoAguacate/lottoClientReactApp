import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";

import HistoryReloads from "./historyReload";

export default class historyBetList extends Component {
  renderHistorys = historys => {
    return historys.map((item, index) => {
      return (
        <HistoryReloads
          key={index}
          idStore={item.idStore}
          amount={item.amount}
          dateTime={item.dateTime._seconds}
        />
      );
    });
  };
  render() {
    return (
      <ScrollView style={styles.list}>
        {this.renderHistorys(this.props.reloads)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: "100%"
  }
});
