import Logo from '@/components/template/Logo'
import SignInForm from './components/SignInForm'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'
import { toast } from 'sonner'
import { useEffect } from 'react'

type SignInProps = {
    signUpUrl?: string
    forgetPasswordUrl?: string
    disableSubmit?: boolean
}

export const SignInBase = ({
    forgetPasswordUrl = '/forgot-password',
    disableSubmit,
}: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()

    const mode = useThemeStore((state) => state.mode)

    useEffect(() => {
        if (message)
            toast.error(message);
    }, [message])

    return (
        <>
            <div className="mb-8">
                <Logo
                    type="full"
                    mode={mode}
                    imgClass="mx-auto"
                />
            </div>

            <div className="mb-10 text-center">
                <h3 className="mb-2">Sistema de Gestión de Becas</h3>
                <p className="heading-text text-gray-500">
                    Por favor, ingresa tus credenciales para iniciar sesión.
                </p>
            </div>
            <SignInForm
                disableSubmit={disableSubmit}
                setMessage={setMessage}
                passwordHint={
                    <div className="mb-7 mt-2">
                        <ActionLink
                            to={forgetPasswordUrl}
                            className="font-semibold heading-text mt-2 underline"
                            themeColor={false}
                        >
                            Recuperar contraseña
                        </ActionLink>
                    </div>
                }
            />
        </>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
