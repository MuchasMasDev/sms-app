import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'scholarsMenu.all',
        path: '/scholars',
        component: lazy(
            () => import('@/views/scholars/management/AllScholars'),
        ),
        authority: [],
    },
    {
        key: 'scholars.scholarDetails',
        path: `/scholars/:id`,
        component: lazy(() => import('@/views/scholars/details')),
        authority: [],
        meta: {
            pageContainerType: 'contained',
        },
    },
    /** Example purpose only, please remove */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     component: lazy(() => import('@/views/demo/SingleMenuView')),
    //     authority: [],
    // },
    ...othersRoute,
]
