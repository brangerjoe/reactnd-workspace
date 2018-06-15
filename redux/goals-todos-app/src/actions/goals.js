import API from 'goals-todos-api'

// See todos comments
export const ADD_GOAL = 'ADD_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOAL'

function addGoal(goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}
function removeGoal(id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

export function handleAddGoal(name, cb) {
    return (dispatch) => {
        API.saveGoal(name).then((goal) => {
            cb();
            dispatch(addGoal(goal));
        }).catch(() => {
            alert('Failed to add goal.');
        });
    }
}

export function handleRemoveGoal(item) {
    return (dispatch) => {
        dispatch(removeGoal(item.id));

        API.deleteGoal(item.id).catch(() => {
            alert('Failed to remove goal.');
            dispatch({
                type: 'ADD_GOAL',
                goal: item
            })
        })
    }
}