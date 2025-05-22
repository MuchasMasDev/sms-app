import ApiService from './ApiService'

export async function apiGetScholar<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/scholars/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetScholarByUser<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/scholars/user/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetScholarLogBook<
    T,
    U extends Record<string, unknown>,
>({ id, ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/logbook/scholar/${id}`,
        method: 'get',
        params,
    })
}
