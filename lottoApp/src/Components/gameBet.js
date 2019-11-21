import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight, TextInput, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

class gameBet extends Component {
    state = {
        beting : false,
        amount : 0,
        number : -1,
        hour: '',
        minutes: '',
        day: '',
        month: '',
        year: '',
    }
    componentDidMount(){
        this.convertDateTime()
    }
    render() {
        return (
            <View>
                    {this.state.beting ? 
                        <View style={styles.container}>
                            <Text style = {styles.text}>{this.props.name}</Text>
                            <Text style = {styles.text}>{`Multiplicador: ${this.props.multiplier}`}</Text>
                            <Text style = {styles.text}>{`Apuesta maxima: ${this.props.maxAmountBet}`}</Text>
                            <Text style = {styles.text}>{`Hora: ${this.state.hour}:${this.state.minutes}`}</Text>
                            <TextInput
                                style={styles.TextInput}
                                placeholderTextColor={"rgba(236, 240, 241,0.85)"}
                                placeholder = {`Tu apuesta` }
                                keyboardType='numeric'
                                onChangeText = { amount => this.setState({amount : amount}) }
                            />
                            <TextInput
                                style={styles.TextInput}
                                placeholderTextColor={"rgba(236, 240, 241,0.85)"}
                                placeholder = "Tu número"
                                keyboardType='numeric'
                                onChangeText = { number => this.setState({number : number}) }
                            />
                            <TouchableHighlight
                            style={styles.button}
                            onPress = {this.bet}>
                                <Text style = {styles.textButton}>
                                    Apostar
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                            style={styles.button}
                            onPress = { () => this.setState({beting : false})}>
                                <Text style = {styles.textButton}>
                                    Cancelar
                                </Text>
                            </TouchableHighlight>
                        </View>
                    :
                        <View style={styles.container}>
                            <Text style = {styles.text}>{this.props.name}</Text>
                            <Text style = {styles.text}>{`Multiplicador: ${this.props.multiplier}`}</Text>
                            <Text style = {styles.text}>{`Apuesta maxima: ${this.props.maxAmountBet}`}</Text>
                            <Text style = {styles.text}>{`Hora: ${this.state.hour}:${this.state.minutes}`}</Text>
                            <TouchableHighlight
                            style={styles.button} 
                            onPress = { () => this.setState({beting : true})}>
                                <Icon style={styles.icon} name="ios-card" size={30}/>
                            </TouchableHighlight>
                        </View>
                    }
                </View>
        )
    }
    convertDateTime = async () => {
        let datetime = new Date(this.props.datetime*1000) //Firebase guarda el datatime en segundos
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
    bet = async () => {
        if(this.state.amount > 0 
            && this.state.amount<= this.props.maxAmountBet
            && this.state.number>0){
            let sendBet ={
                idGame : this.props.idGame,
                idUser : this.props.datosRedux.userInfo,
                amount : this.state.amount,
                number : this.state.number
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
            ToastAndroid.show(`Revisa tu apuesta, no mayor a ${this.props.maxAmountBet} y tu número de la suerte`
            , ToastAndroid.SHORT);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        datosRedux: state
    }
}

export default connect(mapStateToProps)(gameBet);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgb(34, 40, 49)',
        width:'100%',
        padding:'5%',
        paddingVertical:'2%',
        borderRadius:8,
        marginVertical:'2%'
      },
      button:{
          backgroundColor:'rgb(41, 161, 156)',
          borderRadius:8,
          padding:10,
          marginVertical:10,
          width:'100%',
          alignItems:'center'
      },
      textButton:{
          textAlign:'center',
          color:'rgb(163, 247, 191)',
          fontSize:20,
      },
      background: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height:'100%'
      },
      text:{
          textAlign:'center',
          color:'rgb(161, 165, 198)',
          fontSize:20,
          padding:10
      },
      TextInput: {
        backgroundColor: 'rgba(43, 214, 207,0.85)',
        borderRadius:8,
        padding:10,
        marginVertical:10,
        color:'rgb(163, 247, 191)',
        textAlign:'center',
        fontSize:20,
        width:'100%',
        
      },
      icon:{
          color:'rgb(163, 247, 191)'
      }
})
