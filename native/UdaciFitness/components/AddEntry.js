import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import { SubmitEntry, RemoveEntry } from '../utils/api'
import { white, purple } from '../utils/colors'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { addEntry } from '../actions'

function SubmitButton({ onSubmit }) {
    return (
        <TouchableOpacity 
        style={Platform.OS === 'ios'
        ? styles.iosSubmitBtn
        : styles.androidSubmitBtn }
        onPress={onSubmit}>
            <Text style={styles.submitBtnText}>Submit</Text>
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
        const { dispatch } = this.props

        dispatch(addEntry({
            [key]: entry
        }))

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
        const { dispatch } = this.props

        dispatch(addEntry({
            [key]: {
                today: '► Don\'t remember to add an entry!'
            }
        }))

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
                    <TextButton onPress={this.reset}>
                        Clear
                    </TextButton>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text>{JSON.stringify(this.state)}</Text>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                <Text>Add Entries!</Text>
                {Object.keys(metaInfo).map((metric) => {
                    // ...rest refers to the other object props in metaInfo (max, unit, etc)
                    const { getIcon, type, ...rest } = metaInfo[metric]
                    const value = this.state[metric]

                    return (
                        <View key={metric} style={styles.row}>{getIcon()}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        borderRadius: 8,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        padding: 10
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        borderRadius: 4,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        padding: 10,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

function mapStateToProps(state) {
    const key = timeToString()

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)