import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import HistoryBetList from '../Components/historyBetList'
import HistoryReloadList from '../Components/historyReloadList'
import { connect } from 'react-redux'
import background from '../Media/2.jpg'

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
            <ImageBackground 
            source={background}
            blurRadius={3}
            style = {styles.background}>
                <View style={styles.container}>
                    <Text style = {styles.text}>Historial de apuestas</Text>
                    <HistoryBetList 
                    style={styles.list}
                    historys = {this.state.historys}/>  
                    <Text style = {styles.text}>Historial de recargas</Text>
                    <HistoryReloadList 
                    style={styles.list}
                    reloads = {this.state.reloads}/>
                </View>
            </ImageBackground>
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
                if(!responseData.empty){
                    this.setState({historys : responseData.data})
                }
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
                if(!responseData.empty){
                    this.setState({reloads : responseData.data})
                }
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(34, 40, 49, 0.8)',
        width:'100%',
        height:'100%',
        padding:'5%',
        borderRadius:6,
      },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%'
    },
    text:{
        textAlign:'center',
        color:'rgb(161, 165, 198)',
        fontSize:20,
        padding:10
    },
    list:{
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        height:'100%'
    }
})
