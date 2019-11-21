import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight 
  } from 'react-native';
import { 
  createAppContainer,
   NavigationActions 
  } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import StoresScreen from '../Screens/storesScreen'
import UserScreen from '../Screens/userSrceen';
import HistoryScreen from '../Screens/historyScreen'; 


class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Jugar') {
    iconName = `logo-game-controller-b`;
  } else if (routeName === 'Usuario') {
    iconName = `ios-contact`;
  }else if(routeName ==='Historial'){
    iconName=`ios-paper`
  }
  return <IconComponent 
          name={iconName}
          size={24} 
          color={tintColor}
          containerStyle={{margin:10}}/>;
};

const TabNavigator = createBottomTabNavigator({
  Jugar: StoresScreen,
  Usuario: UserScreen,
  Historial: HistoryScreen
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: 'rgb(236, 240, 241)',
    activeBackgroundColor :'rgb(43, 214, 207)',
    inactiveTintColor: 'rgb(163, 247, 191)',
    inactiveBackgroundColor:'rgb(34, 40, 49)',
    animationEnabled:true,
    swipeEnabled :true,
    labelStyle: {
      fontSize: 19,
      },
    tabStyle:{
      paddingTop:10
      },



  },
});
export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});