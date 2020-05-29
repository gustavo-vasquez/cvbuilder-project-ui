import { authenticationHandler } from './authenticationHandler';

export const handleResponse = response => {
    return response.json().then(data => {
        //const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationHandler.logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}