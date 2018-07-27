import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import MetricCard from './MetricCard';
import { white } from '../utils/colors';
import { addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { removeEntry } from '../utils/api';
import TextButton from './TextButton';

class EntryDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params

        return {
            title: `Details for ${entryId}`
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    reset = () => {
        const { remove, goBack, entryId } = this.props

        remove()
        goBack()
        removeEntry(entryId)
    }

    render() {
        const { metrics, entryId } = this.props

        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <TextButton onPress={this.reset}>
                    <Text>RESET</Text>
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
})

const mapDispatchToProps = (dispatch, { navigation }) => {
    const { entryId } = navigation.state.params

    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
                ? getDailyReminderValue()
                : null
        })),
        goBack: () => navigation.goBack()
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { entryId } = navigation.state.params

    return {
        entryId,
        metrics: state[entryId],
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetails)