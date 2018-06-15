import React from 'react';
import { formatTweet } from '../utils/helpers';
import { connect } from 'react-redux';

class Tweet extends React.Component {
    render() {
        return (
            <div>
                {this.props.tweet.name} said: 
                {this.props.tweet.text}
                {this.props.tweet.parent && <div>Replying to {this.props.parent.author}</div>}
                {this.props.hasLiked && <div>You liked this.</div>}
            </div>
        );
    }
}

// Second argument is props passed down to this component from parent
// (ownProps)
const mapStateToProps = ({ authedUser, tweets, users }, { id }) => {
    const tweet = tweets[id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    };
}

export default connect(mapStateToProps)(Tweet);