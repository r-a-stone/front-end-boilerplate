import {createStore, applyMiddleware} from 'redux'
import Reducers from '../Reducers';
import thunk from "redux-thunk/index";

export const configureStore = preloadedState => createStore(
    Reducers,
    preloadedState,
    applyMiddleware(thunk)
);