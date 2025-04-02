import { lazy } from 'react'
import { ADMIN, SCHOLAR, FINANCE, TUTOR, SPC } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const othersRoute: Routes = [
    {
        key: 'accessDenied',
        path: `/access-denied`,
        component: lazy(() => import('@/views/others/AccessDenied')),
        authority: [ADMIN, SCHOLAR, FINANCE, TUTOR, SPC],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
]

export default othersRoute
