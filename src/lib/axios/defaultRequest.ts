import axios from 'axios';
import { getCookie } from 'cookies-next';

const defaultRequest = axios.create({
    baseURL: process.env.MATITTING_HOST_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

defaultRequest.interceptors.response.use(
    async function (response) {
        return response;
    },
    async function (error) {
        if (error.response && error.response.status === 401) {
            const refreshToken = getCookie('refreshToken');

            if (!refreshToken) {
                return Promise.reject(error);
            }
            try {
                const response = await defaultRequest.get('/oauth2/renew-token', {
                    headers: {
                        'Authorization-Refresh': refreshToken,
                    },
                });

                // 토큰 갱신 성공 시 새로운 토큰으로 요청 재시도
                const newAccessToken = response.headers['authorization'];
                defaultRequest.defaults.headers['Authorization'] = newAccessToken;
                error.config.headers['Authorization'] = newAccessToken;

                // 요청을 재시도할 때 원래의 FormData 객체를 그대로 사용
                return defaultRequest.request({
                    ...error.config,
                    transformRequest: [(data, headers) => data],
                });
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        // 401 상태 코드가 아닌 경우에는 그대로 오류 반환
        return Promise.reject(error);
    },
);

export default defaultRequest;
