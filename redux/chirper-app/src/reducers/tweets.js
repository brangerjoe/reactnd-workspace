import { RECEIVE_TWEETS } from '../actions/tweets';

export default function tweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            console.log('State:', ...state, 'action.tweets:', ...action.tweets);
            return {
                // Appending the tweets to the 'tweets' slice of state
                ...state,
                ...action.tweets
            }
        default:
            return state;
    }
}