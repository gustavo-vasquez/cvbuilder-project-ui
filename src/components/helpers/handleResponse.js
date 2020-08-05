import { authenticationHandler } from './authenticationHandler';

export const handleResponse = (response) => {
    return response.text().then(async text => {
        const data = text && JSON.parse(text);
        /*let data;
        try {
            data = response.json();
        }
        catch {
            data = {};
        }*/

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                let currentUser = authenticationHandler.currentUserValue;

                if(currentUser) {console.log("preparando para actualizar token!");
                    return await authenticationHandler.exchangeToken(currentUser.token, currentUser.refreshToken, true);
                }
            }
            
            const error = (data && data.message) || data.title || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}