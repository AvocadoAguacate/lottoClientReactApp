import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import GameBet from './gameBet'

export default class betList extends Component {
    renderGames = (games) => {
        return games.map((item,index) => {
            return (
                <GameBet
                    key= {index}
                    idGame={item.idGame}
                    maxAmountBet={item.maxAmountBet}
                    name={item.name}
                    multiplier={item.multiplier}
                    datetime={item.datetime._seconds}
                />
            )
        })
    }
    render() {
        return (
            <View>
                {this.renderGames(this.props.games)}
            </View>
        )
    }
}

const styles = StyleSheet.create({})