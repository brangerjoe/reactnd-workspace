import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getMetricMetaInfo } from './utils/helpers'
import AddEntry from './components/AddEntry'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
}