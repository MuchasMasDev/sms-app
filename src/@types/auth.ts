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

export type UpdateUser = {
    id: string
    firstName: string
    lastName: string
    email: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type Authorities =
    | 'SCHOLAR'     // This is the role for the students
    | 'FINANCE'     // This is the role for the finanial department
    | 'ACADEMIC'    // This is the role for the academic department
    | 'SPC'         // This is the role fot the Scholarship Program Coordinator
    | 'SPCA'        // This is the role fot the Scholarship Program Coordinator Assistant
    | 'PSY'         // This is the role for the psycologist
    | 'TUTOR'       // This is the role for the tutors
    | 'ADMIN'       // This is the role for the system administrators, they have access to everything

export type User = {
    id?: string | null
    ref_code?: string | null
    first_name?: string | null
    last_name?: string | null
    email?: string | null
    roles?: Authorities[]
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
