import ApiService from "./ApiService";

export async function apiDeletePhoneNumber(id: number, scholarId: string) {
    return ApiService.fetchDataWithAxios({
        url: `/scholars/${scholarId}/phone-number/${id}`,
        method: 'delete',
    })
}