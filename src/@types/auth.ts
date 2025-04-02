export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    session: {
        access_token: string
        token_type: string
        refresh_token: string
        expires_in: number
        expires_at: number
    }
    user: {
        userId: string
        userName: string
        authority: string[]
        avatar: string
        email: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    id?: string | null
    ref_code?: string | null
    first_name?: string | null
    last_name?: string | null
    email?: string | null
    role?: string
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
