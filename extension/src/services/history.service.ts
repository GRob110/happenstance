import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/api-response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_APP_API_SERVER_URL;

export const saveHistory = async (
    userId: string,
    history: { url: string, timestamp: Date, title: string },
    accessToken: string
): Promise<ApiResponse> => {
    const config: AxiosRequestConfig = {
        url: `${apiServerUrl}/users/${userId}/history`,
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