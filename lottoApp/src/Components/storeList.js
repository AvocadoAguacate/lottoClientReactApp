import React, { Component } from 'react'
import { StyleSheet, View,ScrollView } from 'react-native'

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
            <ScrollView style={styles.list}>
                {this.renderStores(this.props.stores)}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    list:{
        width:'100%'
    },
})
