import API from 'goals-todos-api'

// Export because these are used elsewhere
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

// Don't need to append "action" at the end of these
// These are only used below so don't need to export
function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}
function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}
function toggleTodo(id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

export function handleAddTodo(name, cb) {
    return (dispatch) => {
        // Can't do optimistic update because it makes no sense
        // to generate ID client-side
        API.saveTodo(name).then((todo) => {
            cb();
            dispatch(addTodo(todo));
        }).catch(() => {
            alert('Failed to add todo.');
        });
    }
}

export function handleRemoveTodo(item) {
    return (dispatch) => {
        dispatch(removeTodo(item.id));

        // API call fails, dispatch action to add item back
        API.deleteTodo(item.id).catch(() => {
            alert('Failed to remove todo.');
            dispatch({
                type: 'ADD_TODO',
                todo: item
            })
        });
    }
}

export function handleToggleTodo(item) {
    return (dispatch) => {
        dispatch(toggleTodo(item.id));

        // API call fails, dispatch action to toggle item again
        API.saveTodoToggle(item.id).catch(() => {
            alert('Failed to toggle todo.');
            dispatch({
                type: 'TOGGLE_TODO',
                id: item.id
            })
        })
    }
}