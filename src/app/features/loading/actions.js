import { SET_LOADING, UNSET_LOADING } from './constants'

export const setLoading = () => ({
    type: SET_LOADING,
});

export const unsetLoading = () => ({
    type: UNSET_LOADING,
});
