import { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../models/api-response';
import { ApiResponseUser } from '../models/api-response-user';
import {
  callExternalApi,
  callExternalApiTab,
  callExternalApiUser,
} from './external-api-service';
import { ApiResponseTab } from '../models/api-response-tab';

const API_SERVER_URL = import.meta.env.VITE_APP_API_SERVER_URL;

export const getAllUsers = async (
  accessToken: string,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER_URL}/api/users/`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });
  console.log('get all user data: ', data);
  return { data, error };
};

export const getUserData = async (
  userId: string,
  accessToken: string,
): Promise<ApiResponseUser> => {
  console.log('userId: ', userId);
  const config: AxiosRequestConfig = {
    url: `${API_SERVER_URL}/api/users/${userId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApiUser({ config });
  console.log('get user data: ', data);
  return { data, error };
};

export const saveUserData = async (
  userId: string,
  userData: any,
  accessToken: string,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER_URL}/api/users/${userId}`,
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

export const saveActiveTab = async (
  userId: string,
  activeTab: { url: string; timestamp: Date; title: string },
  accessToken: string,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER_URL}/api/users/${userId}/activeTab`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      activeTab,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return { data, error };
};

export const getActiveTabs = async (
  userId: string,
  accessToken: string,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER_URL}/api/users/${userId}/activeTabs`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return { data, error };
};

export const getMostRecentActiveTab = async (
  userId: string,
  accessToken: string,
): Promise<ApiResponseTab> => {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER_URL}/api/users/${userId}/mostRecentActiveTab`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApiTab({ config });

  return { data, error };
};
