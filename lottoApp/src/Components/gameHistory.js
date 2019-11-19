import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class gameHistory extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Text>{`Tu apuesta: ${this.props.amount}`}</Text>
                <Text>{`Tu número: ${this.props.number}`}</Text>
                <Text>{`Fecha: ${this.props.datetime}`}</Text>
                <Text>{`Multiplicador: ${this.props.multiplier}`}</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({})
