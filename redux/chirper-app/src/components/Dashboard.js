import React from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                {this.props.tweetIds.map((id) => (
                    <Tweet id={id} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({ tweets }) => {
    return {
        // Sorting arrays
        tweetIds: Object.keys(tweets).sort((a, b) => {
            return tweets[a].timestamp - tweets[b].timestamp;
        })
    }
}

export default connect(mapStateToProps)(Dashboard);