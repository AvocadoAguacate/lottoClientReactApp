import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import HistoryBet from './historyBet'

export default class historyBetList extends Component {
    renderHistorys = (historys) => {
        return historys.map((item,index) => {
            return (
                <HistoryBet
                    key = {index}
                    idGame = {item.idGame}
                    amount = {item.amount}
                    winner = {item.winner}
                    number = {item.number}
                />
            )
        })
    }
    render() {
        return (
            <View>
                {this.renderHistorys(this.props.historys)}
            </View>
        )
    }
}

const styles = StyleSheet.create({})
