import React, { Component } from 'react'
import { Text, StyleSheet, View,TouchableHighlight } from 'react-native'

import Store from './store'

export default class storeList extends Component {
    renderStores = (stores) => {
        return stores.map((item,index) => {
            return (
                <Store
                    key = {index}
                    idStore = {item.idStore}
                />
            )
        })
    }
    render() {
        return (
            <View>
                {this.renderStores(this.props.stores)}
            </View>
        )
    }
}
const styles = StyleSheet.create({})
