import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import { SubmitEntry, RemoveEntry } from '../utils/api'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader';
import TextButton from './TextButton';

function SubmitButton({ onSubmit }) {
    return (
        <TouchableOpacity onPress={onSubmit}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )
}
class AddEntry extends Component {
    state = {
        run: 10,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 5
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] - step

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        })

        SubmitEntry({ key, entry })
    }

    reset = () => {
        const key = timeToString()

        RemoveEntry(key)
    }

    render() {
        const metaInfo = getMetricMetaInfo()
        const { alreadyLogged } = this.props

        if (alreadyLogged) {
            return (
                <View>
                    <Ionicons name='ios-happy-outline' size={50} />
                    <Text>You already logged info today.</Text>
                    <TextButton onPress={reset}>
                        Clear
                    </TextButton>
                </View>
            )
        }

        return (
            <View>
                <Text>{JSON.stringify(this.state)}</Text>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                <Text>Add Entries!</Text>
                {Object.keys(metaInfo).map((metric) => {
                    // ...rest refers to the other object props in metaInfo (max, unit, etc)
                    const { getIcon, type, ...rest } = metaInfo[metric]
                    const value = this.state[metric]

                    return (
                        <View key={metric}>{getIcon()}
                            {type === 'slider'
                                ? <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(metric, value)}
                                    {...rest} />
                                : <UdaciStepper
                                    value={value}
                                    onIncrement={() => this.increment(metric)}
                                    onDecrement={() => this.decrement(metric)}
                                    {...rest}
                                />}
                        </View>
                    )
                })}
                <SubmitButton onSubmit={this.submit} />
            </View>
        )
    }
}

export default AddEntry