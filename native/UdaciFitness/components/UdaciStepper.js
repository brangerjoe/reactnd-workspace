import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { gray } from '../utils/colors';

export default function UdaciStepper({ value, onIncrement, onDecrement, max, unit, step }) {
    return (
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row' }}>
                {/* Making the middle border radius 0 */}
                <TouchableOpacity
                    style={[styles.button, { borderBottomRightRadius: 0, borderTopRightRadius: 0 }]}
                    onPress={onIncrement}>
                    <FontAwesome name='plus' size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }]}
                    onPress={onDecrement}>
                    <FontAwesome name='minus' size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.metricCounter}>
                <Text style={{ fontSize: 24 }}>
                    {value}
                </Text>
                <Text style={{ fontSize: 18, color: gray }}>
                    {unit}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    button: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 4
    },
    metricCounter: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    }
})