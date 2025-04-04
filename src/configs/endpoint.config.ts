const endpointConfig = {
    auth: {
        prefix: '/auth',
        routes: {
            signIn: '/sign-in',
            signOut: '/sign-out',
            signUp: '/sign-up',
            forgotPassword: '/forgot-password',
            resetPassword: '/reset-password',
        },
    },
    scholars: {
        prefix: '/scholars',
        routes: {
            all: '',
        },
    },
}

export default endpointConfig
