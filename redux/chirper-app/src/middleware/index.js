import { applyMiddleware } from 'redux';
import logger from './logger';
import thunk from 'redux-thunk';

export default applyMiddleware(
    thunk,
    // logger has to be last in line for next() to be dispatch
    logger
);