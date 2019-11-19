import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight, TextInput, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class gameBet extends Component {
    state = {
        beting = false,
        amountBet = 0,
        numberBet = -1
    }
    render() {
        return (
            <View>
                {this.props.beting ? 
                    <View>
                        <Text>Nombre del juego</Text>
                        <Text>Multiplicador</Text>
                        <Text>Hora</Text>
                        <TextInput
                            placeholder = { `Tu apuesta (Apuesta maxima: ${this.props.maxAmuntBet})` }
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
                        onPress = { () => this.setState({beting : false})}>>
                            <Text>
                                Cancelar
                            </Text>
                        </TouchableHighlight>
                    </View>
                :
                    <View>
                        <View>
                            <Text>Nombre del juego</Text>
                            <Text>Multiplicador</Text>
                            <Text>Hora</Text>
                        </View>
                        <TouchableHighlight 
                        onPress = { () => this.setState({beting : true})}>
                            <Text>
                            <Icon style={styles.icon} name="ios-card" size={30} />
                            </Text>
                        </TouchableHighlight>
                    </View>
                }
            </View>
        )
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
            //Envio la apuesta y luego borro los datos locales
            this.setState({amountBet : 0})
            this.setState({beting : false})
        } else {
            ToastAndroid.show(`Revisa tu apuesta, no mayor a ${this.props.maxAmuntBet} y tu número de la suerte`
            , ToastAndroid.SHORT);
        }
    }
}

const styles = StyleSheet.create({})
