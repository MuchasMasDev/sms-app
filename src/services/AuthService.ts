import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
    UpdateUser,
    Authorities,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.auth.prefix + endpointConfig.auth.routes.signIn,
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchDataWithAxios<SignUpResponse>({
        url: endpointConfig.auth.prefix + endpointConfig.auth.routes.signUp,
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.auth.prefix + endpointConfig.auth.routes.signOut,
        method: 'post',
    })
}

export async function apiForgotPassword<T>(data: ForgotPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.auth.prefix + endpointConfig.auth.routes.forgotPassword,
        method: 'post',
        data,
    })
}

export async function apiResetPassword<T>(data: ResetPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.auth.prefix + endpointConfig.auth.routes.resetPassword,
        method: 'post',
        data,
    })
}

export async function apiUpdateUser<T>(data: UpdateUser) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.auth.routes.updateUser + data.id,
        method: 'patch',
        data,
    })
}

export async function apiUpdateUserRoles<T>(roles: Authorities[], id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/users/' + id + '/roles',
        method: 'patch',
        data: { roles },
    })
}

export async function apiChangePassword<T>(data: { password: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.auth.prefix + endpointConfig.auth.routes.changePassword,
        method: 'post',
        data,
    })
}
