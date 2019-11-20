import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

export default class historyBet extends Component {
    state = {
        gameName : '',
        winnerNumber : '',
        datetime: '',
        multiplier: '',
        hour: '',
        minutes: '',
        day: '',
        month: '',
        year: '',
    }
    componentDidMount(){
        this.getInfoGame()
    }
    render() {
        return (
            <View>
                <TouchableHighlight>
                    <View>
                        <Text>{this.state.gameName}</Text>
                        <Text>{`Tu número: ${this.props.number}`}</Text>
                        <Text>{`Tu apuesta: ${this.props.amount}`}</Text>
                        <Text>{`Número ganador: ${this.state.winnerNumber}`}</Text>
                        <Text>{`Multiplicador: ${this.state.multiplier}`}</Text>
                        <Text>{`Fecha: ${this.state.day}/${this.state.month}/${this.state.year}`}</Text>
                        <Text>{`Hora: ${this.state.hour}:${this.state.minutes}`}</Text>
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
                this.setState({multiplier : responseData.multiplier})
                this.setState({datetime : responseData.datetime._seconds})
                this.convertDateTime()
            })
            .catch((error) => {
                return console.error(error);
            });
    }
    convertDateTime = async () => {
        let datetime = new Date(this.state.datetime*1000) //Firebase guarda el datatime en segundos
        let day = datetime.getDate()
        let month = datetime.getMonth()
        let year = datetime.getFullYear()
        let hour = datetime.getHours()
        let minutes = datetime.getMinutes()
        this.setState({day: day})
        this.setState({month: month})
        this.setState({year: year})
        this.setState({hour: hour})
        this.setState({minutes: minutes})
    }
}

const styles = StyleSheet.create({})