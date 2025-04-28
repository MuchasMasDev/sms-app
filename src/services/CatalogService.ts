import ApiService from './ApiService'

// These types should match the API response structure
// Add other types as needed for different catalogs
export type Bank = {
    id: number
    name: string
    logo_src: string
}

export enum Catalog {
    Banks = 'banks',
    // Add other catalogs here as needed
}

export async function apiGetCatalog<T, U extends Record<string, unknown>>(
    params: U,
    catalog: Catalog,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/${catalog}`,
        method: 'get',
        params,
    })
}