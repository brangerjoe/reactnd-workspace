import React from 'react';
import { formatTweet, formatDate } from '../utils/helpers';
import { connect } from 'react-redux';
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweetLike } from '../actions/tweets';

class Tweet extends React.Component {
    toParent = (e) => {
        console.log('We went to parent!');
    }

    handleLike = (e) => {
        console.log('We liked!');
        const { id, authedUser, tweet } = this.props;
        this.props.dispatch(handleToggleTweetLike({ id, authedUser, hasLiked: tweet.hasLiked }));
    }

    render() {
        const { name, avatar, timestamp, text, hasLiked, likes, replies, parent } = this.props.tweet;

        return (
            <div className='tweet'>
                <img
                    src={avatar}
                    className='avatar'
                    alt='Avatar' />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {hasLiked === true
                                ? <TiHeartFullOutline color='#ee0000' className='tweet-icon' />
                                : <TiHeartOutline className='tweet-icon' />}
                        </button>
                        <span>{likes}</span>
                    </div>
                </div>
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