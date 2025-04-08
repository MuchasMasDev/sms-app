import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { CreateScholarSchemaType } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'

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

export async function apiCreateScholar(
    params: CreateScholarSchemaType,
) {

    return ApiService.fetchDataWithAxios({
        url: endpointConfig.scholars.prefix + endpointConfig.scholars.routes.create,
        method: 'post',
        data: {
            ...params,
            dob: params.dob.toISOString(),
            ingressDate: params.ingressDate.toISOString(),
            numberOfChildren: +params.numberOfChildren,
            hasDisability: params.hasDisability === 'false' ? false : true,
            "state": "ACTIVE"
        },
    })
}
