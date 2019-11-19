import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    View,
    ToastAndroid,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'

class storesScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Games </Text>
                <TouchableHighlight style={styles.boton} onPress={this.goToTab}>
                    <Text>
                        Volver
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
    goToTab = async () => {
        this.props.navigation.navigate('Tab');
    }
}

const mapStateToProps = (state) => {
    return {
        datosRedux: state
        //this.props.datosRedux.userInfo
    }
}
export default connect(mapStateToProps)(storesScreen);

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