import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

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
            <View style={styles.container}>
                <Text> Perfil de usuario </Text>
                <Text>{`Nombre: ${this.state.name} ${this.state.lastName1} ${this.state.lastName2}`}</Text>
                <Text>{`Billetera: ${this.state.wallet}`}</Text>
                <Text>{`Cédula: ${this.props.datosRedux.userInfo}`}</Text>
            </View>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
