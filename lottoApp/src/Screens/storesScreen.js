import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    View,
    ToastAndroid,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import StoreList from '../Components/storeList'

class storesScreen extends Component {
    state = {
        stores : []
    }
    componentDidMount(){
        this.getStores()
    }
    render() {
        return (
            <View style={styles.container}>
                <Text> Seleciona un punto venta </Text>
                <StoreList stores = {this.state.stores}/>
            </View>
        )
    }
    getStores = async () => {
        await fetch(global.url+`stores?id=${this.props.datosRedux.userInfo}`
            ,{
                method: "GET",
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({stores : responseData.data})
            })
            .catch((error) => {
                return console.error(error);
            });
    }
}

const mapStateToProps = (state) => {
    return {
        datosRedux: state
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
