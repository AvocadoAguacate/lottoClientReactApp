import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import WinnerDetective from './winnerDetective'

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
    componentWillMount(){
        this.getInfoGame()
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.text}>{this.state.gameName}</Text>
                <Text style = {styles.text}>{`Tu número: ${this.props.number}`}</Text>
                <Text style = {styles.text}>{`Tu apuesta: ${this.props.amount}`}</Text>
                {this.state.winnerNumber>-1 ?
                     <WinnerDetective
                        winnerNumber = {this.state.winnerNumber}
                        number = {this.props.number}
                        multiplier = {this.state.multiplier}
                        amount= {this.props.amount}
                     />
                : 
                    <View>
                        <Text style = {styles.text}>Sin número ganador aún</Text>
                        <Text style = {styles.text}>{`Multiplicador: ${this.state.multiplier}`}</Text>
                    </View>
                }
                <Text style = {styles.text}>{`Fecha: ${this.state.day}/${this.state.month}/${this.state.year}`}</Text>
                <Text style = {styles.text}>{`Hora: ${this.state.hour}:${this.state.minutes}`}</Text>
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

const styles = StyleSheet.create({
    text:{
        textAlign:'center',
        color:'rgb(161, 165, 198)',
        fontSize:16,
        padding:1
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgb(34, 40, 49)',
        width:'100%',
        padding:'5%',
        paddingVertical:'2%',
        borderRadius:8,
        marginVertical:'2%'
    }
})