import { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../models/api-response';
import { callExternalApi } from './external-api.service';

const apiServerUrl = import.meta.env.VITE_APP_API_SERVER_URL;

export const getAllUsers = async (accessToken: string): Promise<ApiResponse> => {
    const config: AxiosRequestConfig = {
        url: `${apiServerUrl}/api/users/`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });
    console.log('get all user data: ', data);
    return { data, error };
};

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

export const saveHistory = async (
    userId: string,
    history: { url: string, timestamp: Date, title: string },
    accessToken: string
): Promise<ApiResponse> => {
    const config: AxiosRequestConfig = {
        url: `${apiServerUrl}/api/users/${userId}/history`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            history,
        },
    }

    const { data, error } = (await callExternalApi({ config })) as ApiResponse;

    return { data, error };
};

export const saveActiveTab = async (
    userId: string,
    activeTab: { url: string, timestamp: Date, title: string },
    accessToken: string
): Promise<ApiResponse> => {
    const config: AxiosRequestConfig = {
        url: `${apiServerUrl}/api/users/${userId}/activeTab`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            activeTab,
        },
    }

    const { data, error } = (await callExternalApi({ config })) as ApiResponse;

    return { data, error };
};

export const getActiveTabs = async (userId: string, accessToken: string): Promise<ApiResponse> => {
    const config: AxiosRequestConfig = {
        url: `${apiServerUrl}/api/users/${userId}/activeTabs`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }

    const { data, error } = await callExternalApi({ config });

    return { data, error };
};