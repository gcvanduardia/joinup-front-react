import axios, { AxiosError } from 'axios';
import { environment } from '../../../enviroments/enviroment';
import { User } from '../global/global'

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

export const verifyToken = async (setUser: React.Dispatch<React.SetStateAction<User>>) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${environment.apiUrl}/auth/verifyToken`,
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'apiKey': environment.apiKey
            }
        });
        console.log('verifyToken: ',response.data.data);
        
        if(response.status === 200){
            const user = await apiReq('POST', 'user/dataIni', {IdUsuario: response.data.data.IdUsuario});
            console.log('user: ', user?.data.data);
            setUser(user?.data.data);
        }

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
        const axiosError = error as AxiosError;
        console.error(axiosError);
        if (axiosError.response) {
            // El servidor respondió con un estado fuera del rango de 2xx
            return {
                data: axiosError.response.data,
                status: axiosError.response.status
            };
        } else if (axiosError.request) {
            // La solicitud se hizo pero no se recibió ninguna respuesta
            console.log(axiosError.request);
        } else {
            // Algo sucedió en la configuración de la solicitud que desencadenó un Error
            console.log('Error', axiosError.message);
        }
        return null;
    }
}