import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createMaterialTopTabNavigator } from 'react-navigation'
import AddEntry from './components/AddEntry'
import History from './components/History'
import reducer from './reducers'
import Ionicons from '@expo/vector-icons/Ionicons';
import { purple, white } from './utils/colors';
import { Constants } from 'expo'

const UdaciStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <Ionicons name='plus-square' size={30} color={tintColor} />
    }
  }
},
  {
    tabBarOptions: {
      activeTintColor: white,
      style: {
        height: 56,
        backgroundColor: purple
      }
    }
  })

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <Tabs />
        </View>
      </Provider>
    );
  }
}