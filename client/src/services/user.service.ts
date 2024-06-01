import { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../models/api-response';
import { callExternalApi } from './external-api.service';

const apiServerUrl = import.meta.env.VITE_APP_API_SERVER_URL;

export const getUserData = async (userId: string, accessToken: string): Promise<ApiResponse> => {
    console.log('userId: ', userId);
    const config: AxiosRequestConfig = {
        url: `${apiServerUrl}/api/users/${userId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });
    console.log('get user data: ', data);
    return { data, error };
};

export const saveUserData = async (userId: string, userData: any, accessToken: string): Promise<ApiResponse> => {
    const config: AxiosRequestConfig = {
        url: `${apiServerUrl}/api/users/${userId}`,
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data: userData,
    };

    const { data, error } = await callExternalApi({ config });
    console.log('save user data: ', data);
    return { data, error };
};