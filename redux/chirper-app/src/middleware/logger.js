const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('The action:', action);
    // Next is dispatch
    const returnValue = next(action);
    console.log('New state:', store.getState());
    console.groupEnd();

    return returnValue;
}

export default logger;