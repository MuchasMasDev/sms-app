import ApiService from './ApiService'

export interface Entity {
    id: number | string;
}

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

export async function apiUpdateCatalogItem<T extends Entity, U>(
    catalog: Catalog,
    id: number | string,
    data: Partial<U> | FormData,
) {
    if (data instanceof FormData)
        return ApiService.fetchFormDataWithAxios<T>({
            url: `/${catalog}/${id}`,
            method: 'patch',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

    return ApiService.fetchDataWithAxios<T>({
        url: `/${catalog}/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiCreateCatalogItem<T extends Entity, U>(
    catalog: Catalog,
    data: Partial<U> | FormData,
) {
    if (data instanceof FormData)
        return ApiService.fetchFormDataWithAxios<T>({
            url: `/${catalog}`,
            method: 'post',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

    return ApiService.fetchDataWithAxios<T>({
        url: `/${catalog}`,
        method: 'post',
        data,
    })
}

export async function apiDeleteCatalogItem<T>(
    catalog: Catalog,
    id: number | string,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/${catalog}/${id}`,
        method: 'delete',
    })
}

