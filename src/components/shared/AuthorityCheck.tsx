import useAuthority from '@/utils/hooks/useAuthority'
import type { CommonProps } from '@/@types/common'
import { Authorities } from '@/@types/auth'

interface AuthorityCheckProps extends CommonProps {
    userAuthority?: Authorities[]
    authority: Authorities[]
}

const AuthorityCheck = (props: AuthorityCheckProps) => {
    const { userAuthority, authority, children } = props

    const roleMatched = useAuthority(userAuthority, authority)

    return <>{roleMatched ? children : null}</>
}

export default AuthorityCheck
