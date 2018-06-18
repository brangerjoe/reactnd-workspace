import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET_LIKE = 'TOGGLE_TWEET_LIKE';
export const ADD_TWEET = 'ADD_TWEET';

function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleAddTweet(text, replyingTo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveTweet({
            text,
            author: authedUser,
            replyingTo
        }).then((tweet) => {
            dispatch(addTweet(tweet));
        }).then(() => {
            dispatch(hideLoading());
        })
    }
}

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets: tweets
    }
}

function toggleTweetLike({ id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_TWEET_LIKE,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToggleTweetLike(info) {
    return (dispatch) => {
        dispatch(toggleTweetLike(info));
        saveLikeToggle(info).catch((e) => {
            alert('Unable to toggle tweet:', e);
            dispatch(toggleTweetLike(info));
        });
    }
}