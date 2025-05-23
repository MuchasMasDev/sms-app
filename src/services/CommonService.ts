import ApiService from './ApiService'

export async function apiGetNotificationCount() {
    return ApiService.fetchDataWithAxios<{
        count: number
    }>({
        url: '/notification/count',
        method: 'get',
    })
}

export async function apiGetNotificationList() {
    return ApiService.fetchDataWithAxios<
        {
            id: string
            target: string
            description: string
            date: string
            image: string
            type: number
            location: string
            locationLabel: string
            status: string
            readed: boolean
        }[]
    >({
        url: '/notification/list',
        method: 'get',
    })
}

export async function apiGetSearchResult<T>(params: { query: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/search/query',
        method: 'get',
        params,
    })
}

export type Municipality = {
    id: number
    name: string
    department_id: number
    departments: {
        name: string
    }
}

type Bank = {
    id: number
    name: string
    logo_src: string
}

export async function apiGetMunicipalities() {
    return ApiService.fetchDataWithAxios<Municipality[]>({
        url: '/municipalities',
        method: 'get',
    })
}

export async function apiGetBanks() {
    return ApiService.fetchDataWithAxios<Bank[]>({
        url: '/banks',
        method: 'get',
    })
}