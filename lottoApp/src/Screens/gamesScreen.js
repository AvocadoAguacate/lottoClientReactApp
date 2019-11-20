import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    View,
    ToastAndroid,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'

import BetList from '../Components/betList'

class storesScreen extends Component {
    state = {
        nameStore:'',
        games:[]
    }
    componentWillMount(){
        this.getInfoStore()
        this.getGamesStore()
    }
    render() {
        return (
            <View style={styles.container}>
                <Text> {this.state.nameStore} </Text>
                <BetList games = {this.state.games}/>
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
    getInfoStore = async () => { 
        await fetch(global.url+`store?id=${this.props.datosRedux.storeId}`
            ,{
                method: "GET",
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({nameStore : responseData.name})
            })
            .catch((error) => {
                return console.error(error);
            });
    }
    getGamesStore = async () => {
        await fetch(global.url+`games?id=${this.props.datosRedux.storeId}`
            ,{
                method: "GET",
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({games : responseData.data})
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