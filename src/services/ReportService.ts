import ApiService from './ApiService'

export async function apiGenerateUsersReport<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/reports/users`,
        method: 'post',
        data,
    })
}

export async function apiGenerateScholarReport<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/reports/scholars`,
        method: 'post',
        data,
    })
}
