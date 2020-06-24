import { BehaviorSubject } from 'rxjs';
import { handleResponse } from './handleResponse';
import { alertNotifications } from './alertNotifications';

const CURRENT_USER_STORAGE_KEY = "currentUser";
var currentUserSubject = new BehaviorSubject(getValidUserData());
console.log(currentUserSubject);

export const authenticationHandler = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    },
    exchangeToken
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch('https://localhost:5001/api/account/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        })
        .catch(errorMessage => alertNotifications.error(errorMessage));
}

function exchangeToken(token, refreshToken, updateUserSubject) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, refreshToken })
    };

    return fetch("https://localhost:5001/api/account/exchangeToken", requestOptions)
        .then(handleResponse)
        .then(newTokens => {console.log("actualicé el token");
            let storedUser = JSON.parse(localStorage[CURRENT_USER_STORAGE_KEY]);
            storedUser.token = newTokens.token;
            storedUser.refreshToken = newTokens.refreshToken;
            localStorage[CURRENT_USER_STORAGE_KEY] = JSON.stringify(storedUser);
            console.log(storedUser);

            if(updateUserSubject)
                currentUserSubject.next(JSON.stringify(storedUser));
            else
                return JSON.stringify(storedUser);
        })
        .catch(errorMessage => { alertNotifications.error(errorMessage); logout(); });
}

function getValidUserData() {
    let currentUserString = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

    if(!currentUserString)
        return null;

    let currentUserObject = JSON.parse(currentUserString);

    fetch(`https://localhost:5001/api/account/validToken?token=${currentUserObject.token}`)
    .then(handleResponse)
    .then(tokenIsValid => {
        if(!tokenIsValid)
            return exchangeToken(currentUserObject.token, currentUserObject.refreshToken);
    })
    .catch(errorMessage => alertNotifications.error(errorMessage));

    return currentUserObject;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    currentUserSubject.next(null);
}