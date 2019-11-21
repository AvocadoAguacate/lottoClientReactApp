import React, { Component } from 'react'
import { Text,
  StyleSheet,
  View, 
  TouchableHighlight,
  ImageBackground,
  TextInput,
  ToastAndroid,
  } from 'react-native'

  import { connect } from 'react-redux'
 
  import background from '../Media/2.jpg'

 class RegisterScreen extends Component {
    state={
        password:'',
        name:'',
        lastName1:'',
        lastName2:'',
        id:'',
        idVal:true
    }
    render() {
        return (
        <ImageBackground source={background}
        style={styles.background}
        blurRadius={3}>
          <View style={styles.container}>
            <TextInput
              style={styles.TextInput}
              placeholder="Cedula"
              keyboardType='numeric'
              placeholderTextColor={"rgba(236, 240, 241,0.85)"}
              onChangeText={ id => this.setState({ id : id }) }
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Contraseña"
              secureTextEntry
              placeholderTextColor={"rgba(236, 240, 241,0.85)"}
              onChangeText={password => this.setState({ password : password })}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Nombre"
              placeholderTextColor={"rgba(236, 240, 241,0.85)"}
              onChangeText={name => this.setState({ name : name })}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Apellido 1"
              placeholderTextColor={"rgba(236, 240, 241,0.85)"}
              onChangeText={lastName1 => this.setState({ lastName1 : lastName1 })}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Apellido 2"
              placeholderTextColor={"rgba(236, 240, 241,0.85)"}
              onChangeText={lastName2 => this.setState({ lastName2:lastName2 })}
            />
            <TouchableHighlight style={styles.button} onPress={this.goToTab}>
              <Text style={styles.textButton}>
                Registrarse
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} 
            onPress={() => this.props.navigation.navigate('Auth')}>
              <Text style={styles.textButton}>
                Cancelar
              </Text>
            </TouchableHighlight>
          </View>
      </ImageBackground>
        )
    }
    idValidation = async () => {
      console.log(1)
      await fetch(global.url+'idValidation'
      ,{
        method: "POST",
        body: JSON.stringify({ id : this.state.id }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Respuesta de idValidation')
        console.log(responseData)
        return  this.setState({idVal : responseData.registered})
      })
      .catch((error) => {
        return console.error(error);
      });
    }
    register = async () => {
      fetch(global.url+'user'
      ,{
        method: "POST",
        body: JSON.stringify({
          name:this.state.name,
          lastName1:this.state.lastName1,
          lastName2:this.state.lastName2,
          id:this.state.id,
          password:this.state.password
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseData) =>{
        console.log('Respuesta registro:')
        console.log(responseData);
        if(responseData.registered){
          this.props.addId(this.state.id)
          this.props.navigation.navigate('Tab');
        }else{
          ToastAndroid.show('Error al registrar, intente más tarde'
          ,ToastAndroid.SHORT);
        }})
        .catch((error) => {
          console.error(error);
        });
    }
    goToTab= async () => {
      if(this.state.id!='' && 
      this.state.password!=''){
        await this.idValidation()
        if(this.state.idVal){
          ToastAndroid.show(`${this.state.id} ya esta registrado`, ToastAndroid.SHORT)
        } else {
        this.register()
        }
      }else{
            ToastAndroid.show('Debes ingresar al menos tu cedula'+ 
            ' y una contraseña para registrarte', ToastAndroid.SHORT);
      }
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
      addId: (userName) => dispatch({ type: 'ADD_ID', payload: userName })
  }
}

export default connect(null,mapDispatchToProps)(RegisterScreen);

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
