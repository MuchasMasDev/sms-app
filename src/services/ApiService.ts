import AxiosBase from './axios/AxiosBase'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const ApiService = {
    fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return new Promise<Response>((resolve, reject) => {
            AxiosBase(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
    
    fetchFormDataWithAxios<Response = unknown>(
        param: AxiosRequestConfig<FormData>,
    ) {
        return new Promise<Response>((resolve, reject) => {
            // Ensure headers are set for FormData
            const configWithHeaders = {
                ...param,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...param.headers,
                },
            };
            
            AxiosBase(configWithHeaders)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService
