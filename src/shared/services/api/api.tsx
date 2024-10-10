// api.tsx
import { useContext, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { environment } from '../../../enviroments/enviroment';
import { UserIdContext } from "../global/global";

const useApi = () => {
    const { setIdUsuario } = useContext(UserIdContext);
    const getJwt = useCallback(() => {
        return localStorage.getItem('joinup-session');
    }, []);

    const verifyToken = useCallback(async () => {
        const jwt = getJwt();
        if (!jwt) return false;
        try {
            const response = await axios({
                method: 'GET',
                url: `${environment.apiUrl}/auth/verifyToken`,
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'apiKey': environment.apiKey
                }
            });
            const responseStatus = response.status === 200;
            if (responseStatus) {
                setIdUsuario(response.data.data.IdUsuario);
                console.log('Usuario guardado correctamente, IdUsuario:', response.data.data.IdUsuario);
            }
            return responseStatus;
        } catch (error) {
            // handle error
            return false;
        }
    }, [getJwt, setIdUsuario]);

    const apiReq = useCallback(async (method: string, url: string, data: object = {}) => {
        const jwt = getJwt();
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
            if (axiosError.response) {
                return {
                    data: axiosError.response.data,
                    status: axiosError.response.status
                };
            }
            // handle error
            return null;
        }
    }, [getJwt]);

    return { verifyToken, apiReq };
};

export default useApi;