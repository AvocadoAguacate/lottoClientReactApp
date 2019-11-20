import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight, TextInput, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class gameBet extends Component {
    state = {
        beting : false,
        amountBet : 0,
        numberBet : -1
    }
    render() {
        return (
            <View>
                {this.state.beting ? 
                    <View>
                        <Text>{this.props.name}</Text>
                        <Text>{`Multiplicador: ${this.props.multiplier}`}</Text>
                        <Text>{`Apuesta maxima: ${this.props.maxAmountBet}`}</Text>
                        <Text>{`Hora: ${new Date(this.props.datetime).getHours}:
                            ${new Date(this.props.datetime).getMinutes}`}</Text>
                        <TextInput
                            placeholder = {`Tu apuesta` }
                            onChange = { bet => this.setState({amountBet : bet}) }
                        />
                        <TextInput
                            placeholder = "Tu número"
                            onChange = { number => this.setState({numberBet : number}) }
                        />
                        <TouchableHighlight
                        onPress = {this.bet}>
                            <Text>
                                Apostar
                            </Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight
                        onPress = { () => this.setState({beting : false})}>
                            <Text>
                                Cancelar
                            </Text>
                        </TouchableHighlight>
                    </View>
                :
                    <View>
                        <View>
                            <Text>{this.props.name}</Text>
                            <Text>{`Multiplicador: ${this.props.multiplier}`}</Text>
                            <Text>{`Apuesta maxima: ${this.props.maxAmountBet}`}</Text>
                            <Text>{`Hora: ${new Date(this.props.datetime).getHours}:
                                ${new Date(this.props.datetime).getMinutes}`}</Text>
                        </View>
                        <TouchableHighlight 
                        onPress = { () => this.setState({beting : true})}>
                            <Text>
                            <Icon style={styles.icon} name="ios-card" size={30}/>
                            </Text>
                        </TouchableHighlight>
                    </View>
                }
            </View>
        )
    }
    changeBeting = async () => {
        this.setState({beting: !this.state.beting})
        console.log('beting:')
        console.log(this.state.beting)
    }
    bet = async () => {
        if(this.state.amountBet > 0 
            && this.state.amountBet<= this.props.maxAmuntBet
            && this.state.numberBet>0){
            let sendBet ={
                idGame : this.props.idGame,
                idUser : this.props.datosRedux.userInfo,
                amount : this.state.amountBet,
                number : this.state.numberBet
            }
            await fetch(global.url+'play'
            ,{
                method: "POST",
                body: JSON.stringify(sendBet),
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.registered){
                    ToastAndroid.show( `Hemos recibido su apuesta, suerte`,ToastAndroid.SHORT);
                    this.setState({amountBet : 0})
                    this.setState({beting : false})
                } else {
                    ToastAndroid.show( `Algo salio mal, intenta más tarde, nunca te rindas`,ToastAndroid.SHORT);
                }
            })
            .catch((error) => {
                return console.error(error);
            });
        } else {
            ToastAndroid.show(`Revisa tu apuesta, no mayor a ${this.props.maxAmuntBet} y tu número de la suerte`
            , ToastAndroid.SHORT);
        }
    }
}

const styles = StyleSheet.create({})
