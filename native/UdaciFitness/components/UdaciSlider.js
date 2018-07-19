import React from 'react'
import { Text, View, Slider } from 'react-native'

// Arguments: destructuring from props
export default function UdaciSlider({ value, onChange, max, unit, step }) {
    return (
        <View>
            <Slider
                value={value}
                onValueChange={onChange}
                maximumValue={max}
                step={step}
            />
            <View>
                <Text>
                    {value} {unit}
                </Text>
            </View>
        </View>
    )
}