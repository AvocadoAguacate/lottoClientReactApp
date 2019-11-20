import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class store extends Component {
    state = {
        name : '',
        address : '',
    }
    componentDidMount(){
        this.getInfoStore()
    }
    render() {
        return (
            <View>
                <TouchableHighlight onPress = {this.selectStore}>
                    <View>
                        <Text>{this.state.name}</Text>
                        <Text>{`Direccion: ${this.state.address}`}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    getInfoStore = async () => { 
        await fetch(global.url+`store?id=${this.props.idStore}`
            ,{
                method: "GET",
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({name : responseData.name})
                this.setState({address : responseData.address})
            })
            .catch((error) => {
                return console.error(error);
            });
    }
    
    selectStore = async () => {
        this.props.addId(this.props.idStore)
        this.props.navigation.navigate('Games');
    }
}

const mapStateToProps = (state) => {
    return {
        datosRedux: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addId: (idStore) => dispatch({ type: 'ADD_STORE_ID', payload: idStore })

    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(store));

const styles = StyleSheet.create({})
