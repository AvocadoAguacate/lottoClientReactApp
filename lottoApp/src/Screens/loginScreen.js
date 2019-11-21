import React, { Component } from 'react'
import { Text,
  StyleSheet,
  View, 
  TouchableHighlight,
  ImageBackground,
  TextInput,
  ToastAndroid
  } from 'react-native'

import { connect } from 'react-redux'
import background from '../Media/2.jpg'

 class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
       id: '',
       password:'',
    };
    global.url='https://us-central1-lottoprojectsoa4id.cloudfunctions.net/'
  }
  
  render() {
    return (
      <ImageBackground 
        source={background}
        blurRadius={3}
        style = {styles.background}>
        <View style={styles.container}>
          <TextInput
            style={styles.TextInput}
            placeholder="Cedula"
            keyboardType='numeric'
            placeholderTextColor={"rgba(236, 240, 241,0.85)"}
            onChangeText={id => this.setState({ id:id })}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Contraseña"
            secureTextEntry
            placeholderTextColor={"rgba(236, 240, 241,0.85)"}
            onChangeText={password => this.setState({ password:password })}
          />
          <TouchableHighlight style={styles.button} onPress={this.goToMenu}>
            <Text style = {styles.textButton}>
              Iniciar Sesion
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.goToRegister}>
            <Text style = {styles.textButton}>
              Registrarse
            </Text>
          </TouchableHighlight>
          </View>
        </ImageBackground>
      );
    }
    
  goToMenu = async () => {
    try {
      fetch(global.url+'loginUser'
      ,{
        method: "POST",
        body: JSON.stringify({
          id: this.state.id,
          password:this.state.password}),
        headers:{
            'Content-Type': 'application/json'
          }
        }).then((response) => response.json())
        .then((responseData) =>
        {
          if(responseData.login){
            this.props.addId(this.state.id);
            this.props.navigation.navigate('Tab');
          }else{
            ToastAndroid.show('Contraseña o correo incorrecto, intente de nuevo'
              ,ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
        console.error(error);
        });
    } catch (error) {
      ToastAndroid.show('Revisa tu conexión a internet')
    }
  };
  goToRegister = async () => {
    this.props.navigation.navigate('Register');
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      addId: (userName) => dispatch({ type: 'ADD_ID', payload: userName })
  }
}

export default connect(null,mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(34, 40, 49, 0.8)',
    width:'100%',
    height:'100%',
    padding:'5%',
    borderRadius:6,
  },
  button:{
      backgroundColor:'rgb(41, 161, 156)',
      borderRadius:8,
      padding:10,
      marginVertical:10,
      width:'100%',
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
  intro:{
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
    
  }
});