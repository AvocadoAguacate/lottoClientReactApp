import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import HistoryReloads from './historyReload'

export default class historyBetList extends Component {
    renderHistorys = (historys) => {
        return historys.map((item,index) => {
            return (
                <HistoryReloads
                    key = {index}
                    idStore = {item.idStore}
                    amount = {item.amount}
                    dateTime = {item.dateTime._seconds}
                />
            )
        })
    }
    render() {
        return (
            <View>
                {this.renderHistorys(this.props.reloads)}
            </View>
        )
    }
}

const styles = StyleSheet.create({})