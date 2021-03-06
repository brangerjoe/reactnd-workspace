import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import UdacifitnessCalendar from 'udacifitness-calendar'
import { white } from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import { AppLoading } from 'expo'

class History extends Component {
    state = {
        ready: false
    }

    componentDidMount() {
        const { dispatch } = this.props

        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
                const today = timeToString()

                if (!entries[today]) {
                    dispatch(addEntry({
                        [today]: getDailyReminderValue()
                    }))
                }
            })
            .then(() => this.setState(() => ({ ready: true })))
    }

    // Single item! Today refers to 'did not log on this date'
    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        <View style={styles.item}>
            {today
                ? <View>
                    <DateHeader date={formattedDate} />
                    <Text style={styles.noDataText}>
                        {today}
                    </Text>
                </View>
                : <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'EntryDetails',
                    { entryId: key }
                )}>
                    <MetricCard metrics={metrics} date={formattedDate} />
                </TouchableOpacity>}
        </View>
    )

    // Not an arrow function because we're not using the 'this' keyword inside of it
    renderEmptyDate(formattedDate) {
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>
                    You didn't enter anything for this day!
                </Text>
            </View>
        )
    }

    render() {
        const { ready } = this.state
        const { entries } = this.props

        if (!ready) {
            return (
                <View>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        }

        return (
            <UdacifitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: 8,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 18,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
})

function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(History)

