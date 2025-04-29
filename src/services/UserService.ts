import ApiService from '@/services/ApiService'

export async function apiGetAllUsers<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/users',
        method: 'get',
        params,
    })
}

export async function apiGetUserById<T>(id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/users/' + id,
        method: 'get',
    })
}

export async function apiDeleteUser<T>(id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/users/' + id,
        method: 'delete',
    })
}