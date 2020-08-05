import { BehaviorSubject } from 'rxjs';
import { handleResponse } from './handleResponse';
import { alertNotifications } from './alertNotifications';

const CURRENT_USER_STORAGE_KEY = "currentUser";
var currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(CURRENT_USER_STORAGE_KEY)));
//var currentUserSubject = new BehaviorSubject(setTimeout(async () => await getValidUserData()), 500); //new BehaviorSubject(undefined);
//setTimeout(async () => await getValidUserData(), 500);
//console.log(currentUserSubject);

export const authenticationHandler = {
    register,
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    },
    exchangeToken,
    getValidUserData
};

function register(email, password, confirmPassword, termsAndConditions) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword, termsAndConditions })
    }

    return fetch("https://localhost:5001/api/account/register", requestOptions)
           .then(handleResponse)
           .then(userData => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userData));
                currentUserSubject.next(userData);

                return userData;
           })
           .catch(errorMessage => alertNotifications.error(errorMessage));
}

function login(email, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    };

    return fetch("https://localhost:5001/api/account/login", requestOptions)
           .then(handleResponse)
           .then(userData => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userData));
                currentUserSubject.next(userData);

                return userData;
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

            if(updateUserSubject) {
                currentUserSubject.next(storedUser);
                return { retry: true };
            }
        })
        .catch(errorMessage => {
            alertNotifications.error(errorMessage);
            logout();
        });
}

function getValidUserData() {
    let currentUserString = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

    if(!currentUserString)
        return logout();

    let currentUserObject = JSON.parse(currentUserString);

    fetch(`https://localhost:5001/api/account/validToken?token=${currentUserObject.token}`)
    .then(handleResponse)
    .then(async tokenIsValid => {console.log("el token es valido: " + tokenIsValid);
        if(!tokenIsValid) {
            let result = await exchangeToken(currentUserObject.token, currentUserObject.refreshToken);
            if(result && result.token && result.refreshToken)
                currentUserSubject.next(result);
        }
    })
    .catch(errorMessage => {
        alertNotifications.error(errorMessage);
        return logout();
    });

    return currentUserSubject.next(currentUserObject);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    currentUserSubject.next(null);
}