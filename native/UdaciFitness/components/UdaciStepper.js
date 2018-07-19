import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

export default function UdaciStepper({ value, onIncrement, onDecrement, max, unit, step }) {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={onIncrement}>
                    <FontAwesome name='plus' size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDecrement}>
                    <FontAwesome name='minus' size={20} />
                </TouchableOpacity>
            </View>
            <View>
                <Text>{value} {unit}</Text>
            </View>
        </View>
    )
}