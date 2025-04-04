import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function apiGetAllScholarsList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url:
            endpointConfig.scholars.prefix + endpointConfig.scholars.routes.all,
        method: 'get',
        params,
    })
}
