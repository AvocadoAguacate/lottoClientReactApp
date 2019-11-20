import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

export default class store extends Component {
    state = {
        gameName : '',
        winnerNumber : '',
        datetime: '',
        multiplier: '',
    }
    componentDidMount(){
        this.getInfoGame()
    }
    render() {
        return (
            <View>
                <TouchableHighlight onPress = {this.selectStore}>
                    <View>
                        <Text>{this.state.gameName}</Text>
                        <Text>{`Tu número: ${this.props.number}`}</Text>
                        <Text>{`Tu apuesta: ${this.props.amount}`}</Text>
                        <Text>{`Número ganador: ${this.state.winnerNumber}`}</Text>
                        <Text>{`Multiplicador: ${this.state.multiplier}`}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    getInfoGame = async () => { 
        await fetch(global.url+`game?id=${this.props.idGame}`
            ,{
                method: "GET",
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({gameName : responseData.name})
                this.setState({winnerNumber : responseData.winnerNumber})
                this.setState({datetime : responseData.datetime._seconds})
                this.setState({multiplier : responseData.multiplier})
            })
            .catch((error) => {
                return console.error(error);
            });
    }
    
    selectStore = async () => {
        this.props.addId(this.props.idStore)
        this.props.navigation.navigate('Games');
    }
}

const styles = StyleSheet.create({})