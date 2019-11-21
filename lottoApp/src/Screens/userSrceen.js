import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import background from '../Media/2.jpg'
class userSrceen extends Component {
    state={
        name : '',
        lastName1 : '',
        lastName2 : '',
        wallet : '',
    }

    componentDidMount(){
        this.getInfoUser()
        //this.timer = setInterval(()=> this.getInfoUser(), 1000)
    }

    render() {
        return (
            <ImageBackground 
            source={background}
            blurRadius={3}
            style = {styles.background}>
                <View style={styles.container}>
                    <Text style = {styles.text}> Perfil de usuario </Text>
                    <Text style = {styles.text}>{`Nombre: ${this.state.name} ${this.state.lastName1} ${this.state.lastName2}`}</Text>
                    <Text style = {styles.text}>{`Billetera: ${this.state.wallet}`}</Text>
                    <Text style = {styles.text}>{`Cédula: ${this.props.datosRedux.userInfo}`}</Text>
                </View>
            </ImageBackground>
        )
    }
    getInfoUser = async () => {
        fetch(global.url+`user?id=${this.props.datosRedux.userInfo}`
        , {
            method: "GET",
            headers:{
                'Content-Type': 'application/json'
            }   
        })
         .then((response) => response.json())
         .then((responseData) =>
        {
            this.setState({
                name : responseData.name,
                lastName1 : responseData.lastName1,
                lastName2 : responseData.lastName2,
                wallet : responseData.wallet,
            })
        })
         .catch((error) => {
             console.error(error);
        });
    }
}

const mapStateToProps = (state) => {
    return {
        datosRedux: state
        //this.props.datosRedux.userInfo
    }
}

export default connect(mapStateToProps)(userSrceen);

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
      text:{
        textAlign:'center',
        color:'rgb(161, 165, 198)',
        fontSize:20,
        padding:10
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%'
    },
})
