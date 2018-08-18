import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import Reducers from '../Reducers';

export const configureStore = preloadedState => {

    const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    });
    const store = createStore(Reducers, preloadedState, composeEnhancers(
        applyMiddleware(thunk)
    ));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(Reducers)
        })
    }

    return store;
};