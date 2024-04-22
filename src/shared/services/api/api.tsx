import axios from 'axios';
import { environment } from '../../../enviroments/enviroment';

let jwt = "";

export const setJwt = (token: string) => {
    jwt = token;
}

export const getJwt = () => {
    const storedSession = localStorage.getItem('joinup-session');
    if (storedSession) {
        const session = JSON.parse(storedSession);
        jwt = session.jwt;
        console.log('jwt: ', jwt);
    }
}

export const verifyToken = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${environment.apiUrl}/auth/verifyToken`,
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'apiKey': environment.apiKey
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const apiReq = async (method: string, url: string, data: any) => {
    try {
        const response = await axios({
            method: method,
            url: `${environment.apiUrl}/${url}`,
            data: data,
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'apiKey': environment.apiKey
            }
        });
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}