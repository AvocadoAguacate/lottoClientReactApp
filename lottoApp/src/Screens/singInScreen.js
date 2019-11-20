import React, { Component } from 'react'
import { Text,
  StyleSheet,
  View, 
  TouchableHighlight,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  } from 'react-native'

  import { connect } from 'react-redux'
  
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
        <ImageBackground source={{uri:'https://images.unsplash.com/photo-1551218372-a8789b81b253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'}}
      style={styles.container}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <View style={styles.cuadro}>
        <TextInput
          style={styles.TextInput}
          placeholder="Cedula"
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
        <TouchableHighlight style={styles.boton} onPress={this.goToTab}>
          <Text style={styles.textoBoton}>
            Registrarse
          </Text>
        </TouchableHighlight>
        </View>
        </KeyboardAvoidingView>
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
          console.log(2)
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    boton:{
      borderRadius:8,
      backgroundColor:'rgb(241, 196, 15)',
      padding:10,
      margin:5,
      width:'90%',
    },
    textoBoton:{
      color:'rgb(230, 126, 34)',
      fontSize:20,
      textAlign:"center"
    },
    TextInput:{
      borderRadius:8,
      backgroundColor:'rgba(243, 156, 18,0.8)',
      fontSize:20,
      color:'rgb(236, 240, 241)',
      padding:10,
      margin:5,
      width:'90%',
      textAlign:"center",
    },
    KeyboardAvoidingView:{
      width:'100%',
      alignItems: 'center',
    },
    cuadro:{
        backgroundColor:'rgba(46,46,46,0.5)',
        width:'100%',
        height:'100%',
        margin:'5%',
        paddingTop:'10%',
        paddingBottom:'10%',
        alignItems: 'center',
        justifyContent: 'center',  
    }
  });
