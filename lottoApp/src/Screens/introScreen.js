import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    View,
    ToastAndroid,
    TouchableHighlight
} from 'react-native'

export default class storesScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Aqui va una introduccion </Text>
                <TouchableHighlight style={styles.boton} onPress={this.goToLogin}>
                    <Text>
                        Continuar
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
    goToLogin = async () => {
        this.props.navigation.navigate('Auth');
    }
}

const mapStateToProps = (state) => {
    return {
        datosRedux: state
        //this.props.datosRedux.userInfo
    }
}

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
})
