import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class winnerDetective extends Component {
    render() {
        return (
            <View>
                <Text style = {styles.text}>{`Multiplicador: ${this.props.multiplier}`}</Text>
                {
                    this.props.number == this.props.winnerNumber ?
                        <Text style = {styles.text}>{`Has ganado ${this.props.multiplier*this.props.amount}`}</Text>
                    :
                        <Text style = {styles.text}>{`Número ganador: ${this.props.winnerNumber}`}</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        textAlign:'center',
        color:'rgb(161, 165, 198)',
        fontSize:16,
        padding:1
    }
})
