import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

export default class historyBet extends Component {
    state = {
        storeName : '',
        address : '',
        hour: '',
        minutes: '',
        day: '',
        month: '',
        year: '',
    }
    componentDidMount(){
        this.getInfoStore()
        this.convertDateTime()
    }
    render() {
        return (
            <View>
                <TouchableHighlight>
                    <View>
                        <Text>{`Recarga en ${this.state.storeName}`}</Text>
                        <Text>{`Dirección: ${this.state.address}`}</Text>
                        <Text>{`Monto: ${this.props.amount}`}</Text>
                        <Text>{`Fecha: ${this.state.day}/${this.state.month}/${this.state.year}`}</Text>
                        <Text>{`Hora: ${this.state.hour}:${this.state.minutes}`}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    convertDateTime = async () => {
        let datetime = new Date(this.props.dateTime*1000) //Firebase guarda el datatime en segundos
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
    getInfoStore = async () => { 
        await fetch(global.url+`store?id=${this.props.idStore}`
            ,{
                method: "GET",
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({storeName : responseData.name})
                this.setState({address : responseData.address})
            })
            .catch((error) => {
                return console.error(error);
            });
    }
}

const styles = StyleSheet.create({})