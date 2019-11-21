import React, { Component } from 'react'
import { StyleSheet, View, ScrollView} from 'react-native'

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
            <ScrollView style={styles.list} >
                {this.renderGames(this.props.games)}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        width:'100%'
    },
})