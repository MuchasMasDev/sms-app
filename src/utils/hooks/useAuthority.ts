import { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import { Authorities } from '@/@types/auth'

function useAuthority(
    userAuthority: Authorities[] = [],
    authority: string[] = [],
    emptyCheck = false,
) {
    const roleMatched = useMemo(() => {
        return authority.some((role) => userAuthority.includes(role as Authorities))
    }, [authority, userAuthority])

    if (
        isEmpty(authority) ||
        isEmpty(userAuthority) ||
        typeof authority === 'undefined'
    ) {
        return !emptyCheck
    }

    return roleMatched
}

export default useAuthority
