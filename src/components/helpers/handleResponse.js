import { authenticationHandler } from './authenticationHandler';

export const handleResponse = async response => {
    let data = await response.json();

    if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            let currentUser = authenticationHandler.currentUserValue;

            if(currentUser) {
                var wasSuccess = await authenticationHandler.exchangeToken(currentUser.token, currentUser.refreshToken, true);
                
                if(wasSuccess)
                    return { updatedToken: wasSuccess };
            }
        }
        
        const error = (data && data.message) || data.title || response.statusText;
        return Promise.reject(error);
    }

    return data;
}