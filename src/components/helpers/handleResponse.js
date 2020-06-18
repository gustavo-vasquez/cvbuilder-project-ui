//import React from 'react';
//import { Redirect } from 'react-router-dom';
import { authenticationHandler } from './authenticationHandler';

export const handleResponse = response => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                const currentUser = authenticationHandler.currentUserValue;
                if(currentUser)
                    authenticationHandler.exchangeToken(currentUser.token, currentUser.exchangeToken, true);

                console.log("Debería ir a la pantalla de login.");
                /*authenticationHandler.logout();
                return <Redirect to="/account/signin"></Redirect>*/
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}