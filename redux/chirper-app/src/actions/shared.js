import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveTweets } from './tweets';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

// Hardcoded authed user
const AUTHED_USER = 'tylermcginnis';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        getInitialData()
            .then(({ users, tweets }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveTweets(tweets));
                dispatch(setAuthedUser(AUTHED_USER));
                dispatch(hideLoading());
            });
    }
}