import axios, { AxiosError } from 'axios';
import { environment } from '../../../enviroments/enviroment';

let jwt = "";

export const setJwt = (token: string) => {
    jwt = token;
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