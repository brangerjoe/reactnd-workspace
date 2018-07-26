import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton({ onPress, children, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            {/* Styles are passed and will apply after the first one */}
            <Text style={[styles.reset, style]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: purple
    }
})