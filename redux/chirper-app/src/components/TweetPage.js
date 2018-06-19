import React from 'react';
import NewTweet from './NewTweet';
import Tweet from './Tweet';
import { connect } from 'react-redux';

class TweetPage extends React.Component {
    render() {
        const { id, replies } = this.props;
        return (
            <div>
                <Tweet id={id} />
                <NewTweet id={id} />
                {replies.map((reply) => (
                    <li key={reply}>
                        <Tweet id={reply} />
                    </li>
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({ tweets }, props) => {
    const { id } = props.match.params;

    return {
        id,
        replies: tweets[id] !== null
            ? tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
            : []
    }
}

export default connect(mapStateToProps)(TweetPage);