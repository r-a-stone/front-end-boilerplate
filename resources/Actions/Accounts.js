import Request from '../Utilities/Request';

export const ACTIONS = {
    ADDED: 'ACCOUNTS:ADDED',
    UPDATED: 'ACCOUNTS:UPDATED',
    REMOVED: 'ACCOUNTS:REMOVED'
};

export const added = accounts => {
    return { type: ACTIONS.ADDED, payload: accounts }
};

export const updated = accounts => {
    return { type: ACTIONS.UPDATED, payload: accounts }
};

export const removed = accounts => {
    return { type: ACTIONS.REMOVED, payload: accounts }
};

export const fetchAccounts = accountIds => async dispatch => {
    const res = await Request.get( '/api/accounts', {
        params: {
            accountIds
        }
    } );

    dispatch( added( res.data.accounts ) );
};

export const updateAccounts = accounts => async dispatch => {
    const res = await Request.put( '/api/accounts', {
        params: {
            accounts
        }
    } );

    dispatch( updated( res.data.accounts ) );
};

export const removeAccounts = accounts => async dispatch => {
    const res = await Request.delete( '/api/accounts', {
        params: {
            accounts
        }
    } );

    dispatch( removed( accounts ) );
};