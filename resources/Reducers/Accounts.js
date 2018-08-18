import initialState from "../initialState";
import {ACTIONS} from "../Actions/Accounts";

const payloadAsArray = payload => (!Array.isArray(payload)) ? [payload] : payload;

const addAccounts = (state, action) => {
    let payload = payloadAsArray(action.payload);

    // Remove any new accounts that already exist in the collection.
    let accounts = payload.filter(item => state.collection.indexOf(item) !== -1);

    return {
        ...state,
        collection: [
            ...state.collection,
            ...accounts
        ]
    };
};

const updateAccounts = (state, action) => {
    let payload = payloadAsArray(action.payload);

    let accounts = state.collection.map(currentAccountEntry => {
        let updatedAccountEntry = payload.find(entry => entry.id === currentAccountEntry.id);

        if (typeof updatedAccountEntry !== 'undefined') {
            return {
                ...currentAccountEntry,
                ...updatedAccountEntry
            };
        }

        return currentAccountEntry;
    });

    return {
        ...state,
        collection: [
            ...accounts
        ]
    }
};

const removeAccounts = (state, action) => {
    let payload = payloadAsArray(action.payload);

    // Remove any accounts from the collection that exist in the payload.
    let accounts = state.collection.filter(item => payload.indexOf(item) === -1);

    return {
        ...state,
        collection: [
            ...accounts
        ]
    };
};

export default function Accounts(state = initialState.Accounts, action) {
    switch (action.type) {
        case ACTIONS.ADDED:
            return addAccounts(state, action);
        case ACTIONS.REMOVED:
            return removeAccounts(state, action);
        case ACTIONS.UPDATED:
            return updateAccounts(state, action);
        default:
            return state;
    }
}