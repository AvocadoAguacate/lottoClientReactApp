import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import HistoryList from '../Components/historyList'
import { connect } from 'react-redux'

class historyScreen extends Component {
    state = {
        historys : []
    }
    componentDidMount(){
        this.getHistorys()
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Historial</Text>
                <HistoryList historys = {this.state.historys}/>
            </View>
        )
    }
    getHistorys = async () => {
        console.log(global.url+`history?id=${this.props.datosRedux.userInfo}`)
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
