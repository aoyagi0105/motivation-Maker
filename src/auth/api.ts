import axios from "axios";
import { tokenStore } from "./tokenStore";
import { baseURL } from "../common/common";
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { navigate } from "../common/navigationRef";

export const api = axios.create({
    baseURL
});

api.interceptors.request.use((config) => {
    const accessToken = tokenStore.get();
    if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {

        if (err.response?.status !== 401 || err.config._retry) {
            return Promise.reject(err);
        }

        err.config._retry = true;
        const refresh = await SecureStore.getItemAsync('refreshToken');
        if (!refresh) {
            return Promise.reject(err);
        }

        try {
            const accessTokenRes = await axios.post(baseURL + "auth/getAccessToken", { refresh });
            const newAccessToken = accessTokenRes.data.access;
            tokenStore.set(newAccessToken);
            err.config.headers.Authorization = `Bearer ${newAccessToken}`
            return api(err.config);
        } catch (refreshErr) {
            Alert.alert('토큰이 만료되었습니다. 다시 로그인해주세요');
            navigate("InitialScreen")
            return Promise.reject(refreshErr);
        }
    }
)