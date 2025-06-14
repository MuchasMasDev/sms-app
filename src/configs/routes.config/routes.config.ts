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
        key: 'profile',
        path: `/profile`,
        component: lazy(() => import('../../views/auth/Settings')),
        authority: [],
    },
    // ADMIN MENU
    {
        key: 'adminMenu.users.all',
        path: '/users',
        component: lazy(() => import('@/views/management/Users/AllUsers')),
        authority: ['ADMIN'],
    },
    {
        key: 'adminMenu.scholarsMenu.all',
        path: '/scholars',
        component: lazy(
            () => import('@/views/scholars/management/AllScholars'),
        ),
        authority: ['ADMIN', 'SPC', 'SPCA', 'FINANCE', 'PSY'],
    },
    {
        key: 'adminMenu.scholarsMenu.create',
        path: '/scholars/new',
        component: lazy(
            () => import('@/views/scholars/management/ScholarCreate'),
        ),
        authority: ['ADMIN', 'SPC', 'SPCA'],
    },
    {
        key: 'adminMenu.scholarsMenu.edit',
        path: '/scholars/edit/:id',
        component: lazy(
            () => import('@/views/scholars/management/ScholarEdit'),
        ),
        authority: ['ADMIN', 'SPC', 'SPCA'],
    },
    {
        key: 'scholars.scholarDetails',
        path: `/scholars/details/:id`,
        component: lazy(() => import('../../views/scholars/ScholarDetails')),
        authority: ['ADMIN', 'SPC', 'SPCA', 'FINANCE', 'PSY'],
    },
    // APP CATALOGS
    {
        key: 'catalogs.banks',
        path: `/catalogs/banks`,
        component: lazy(() => import('../../views/management/Banks')),
        authority: ['ADMIN'],
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
