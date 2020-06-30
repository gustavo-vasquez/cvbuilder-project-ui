import { authenticationHandler } from './authenticationHandler';

export function authorizationHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationHandler.currentUserValue;

    if (currentUser && currentUser.token)
        return { Authorization: `Bearer ${currentUser.token}` };
    else
        return {};
}