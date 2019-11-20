import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    View,
    ToastAndroid,
    TouchableHighlight,
    ImageBackground
} from 'react-native'
import background from '../Media/1.jpg'
export default class storesScreen extends Component {
    render() {
        return (
            <ImageBackground 
            source={background}
            blurRadius={2}
            style = {styles.background}>
                <View style={styles.container}>
                    <Text style = {styles.intro}>Recarga en tu punto de venta</Text>
                    <Text style = {styles.intro}>Gana jugando lotto</Text>
                    <Text style = {styles.intro}>Desde de tu celular</Text>
                    <TouchableHighlight style={styles.button} onPress={this.goToLogin}>
                        <Text style = {styles.textButton}>
                            Continuar
                        </Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        )
    }
    goToLogin = async () => {
        this.props.navigation.navigate('Auth');
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor:'rgba(34, 40, 49, 0.8)',
        width:'90%',
        height:'40%',
        padding:'5%',
        borderRadius:6,

    },
    button:{
        borderRadius:8,
        backgroundColor:'rgb(41, 161, 156)',
        padding:10,
        marginVertical:10,
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
    }
})
