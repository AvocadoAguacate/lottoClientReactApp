import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import HistoryBetList from '../Components/historyBetList'
import HistoryReloadList from '../Components/historyReloadList'
import { connect } from 'react-redux'

class historyScreen extends Component {
    state = {
        historys : [],
        reloads: []
    }
    componentWillMount(){
        this.getHistorys()
        this.getReloads()
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Historial de apuestas</Text>
                <HistoryBetList historys = {this.state.historys}/>
                <Text>Historial de recargas</Text>
                <HistoryReloadList reloads = {this.state.reloads}/>
            </View>
        )
    }
    getHistorys = async () => {
        await fetch(global.url+`history?id=${this.props.datosRedux.userInfo}`
            ,{
                method: "GET",
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({historys : responseData.data})
            })
            .catch((error) => {
                return console.error(error);
            });
    }
    getReloads = async () => {
        await fetch(global.url+`reloads?id=${this.props.datosRedux.userInfo}`
            ,{
                method: "GET",
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({reloads : responseData.data})
            })
            .catch((error) => {
                return console.error(error);
            });
    }
}

const mapStateToProps = (state) => {
    return {
        datosRedux: state
        //this.props.datosRedux.userInfo
    }
}

export default connect(mapStateToProps)(historyScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
