const endpointConfig = {
    auth: {
        prefix: '/auth',
        routes: {
            signIn: '/sign-in',
            signOut: '/sign-out',
            signUp: '/sign-up',
            forgotPassword: '/forgot-password',
            resetPassword: '/reset-password',
            updateUser: '/users/',
        },
    },
    scholars: {
        prefix: '/scholars',
        routes: {
            all: '',
            create: '',
        },
    },
    scholarsLogBook: {
        prefix: '/logbook',
        routes: {
            all: '',
            from: '/scholar/',
            create: '/scholar/',
        },
    },
}

export default endpointConfig
