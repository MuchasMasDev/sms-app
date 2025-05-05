import ApiService from '@/services/ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { CreateScholarSchemaType } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { Log } from '@/views/scholars/ScholarDetails/CreateScholarLog'

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
            hasDisability: params.hasDisability,
            "state": "ACTIVE"
        },
    })
}

export async function apiUpdateScholar(
    params: CreateScholarSchemaType,
    id: string,
) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.scholars.prefix + '/' + id,
        method: 'patch',
        data: {
            ...params,
            dob: params.dob.toISOString(),
            ingressDate: params.ingressDate.toISOString(),
            numberOfChildren: +params.numberOfChildren,
            hasDisability: params.hasDisability,
            "state": "ACTIVE"
        },
    })
}

export async function apiCreateScholarLog(data: Log, scholarId: string) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.scholarsLogBook.prefix + endpointConfig.scholarsLogBook.routes.create + scholarId,
        method: 'post',
        data: {
            ...data,
            date: data.date ? data.date.toISOString() : new Date().toISOString(),
        },
    })
}
