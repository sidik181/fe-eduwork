import { USER_LOGIN, USER_LOGOUT } from './constants'

export const userLogin = payload => {
    localStorage.setItem('auth', JSON.stringify(payload))
    return { type: USER_LOGIN, payload }
};

export const userLogout = () => {
    localStorage.removeItem('auth')
    return { type: USER_LOGOUT };
};
