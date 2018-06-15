import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveTweets } from './tweets';
import { setAuthedUser } from './authedUser';

// Hardcoded authed user
const AUTHED_USER = 'tylermcginnis';

export function handleInitialData() {
    return (dispatch) => {
        getInitialData()
            .then(({ users, tweets }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveTweets(tweets));
                dispatch(setAuthedUser(AUTHED_USER));
            });
    }
}