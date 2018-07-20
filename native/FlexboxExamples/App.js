import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry } from 'react-native'

class FlexboxExamples extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Placing flex on individual element makes it 
        take as much space as its parent (stretches out) */}
        <View style={[styles.box, {flex: 1}]}/>
        {/* alignSelf aligns a single element in flexbox */}
        <View style={[styles.box, {flex: 1, alignSelf: 'flex-end'}]}/>
        <View style={[styles.box, {flex: 1}]}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'stretch', // Stretches elements as long as they don't have a height (for row) or width (for column)
    alignItems: 'center', // Aligns items toward the center of axis (row = cross axis)
    // justifyContent: 'flex-start' // Boxes are aligned at start of flex
    // justifyContent: 'flex-end'
    justifyContent: 'center'
    // justifyContent: 'space-between' // First and last elements have no padding
    // justifyContent: 'space-around'
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: '#e76e63',
    margin: 5
  }
})

export default FlexboxExamples