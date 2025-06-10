import {
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_TITLE
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Inicio',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'scholarsMenu',
        path: '',
        title: 'Becarias',
        translateKey: 'nav.scholarsMenu',
        icon: 'scholarsMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['ADMIN', 'SPC', 'SPCA', 'FINANCE', 'PSY'],
        subMenu: [
            {
                key: 'scholarsMenu.all',
                path: '/scholars',
                title: 'Todos los registros',
                translateKey: 'nav.scholarsMenu.all',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }, {
                key: 'scholarsMenu.create',
                path: '/scholars/new',
                title: 'Agregar una becaria',
                translateKey: 'nav.scholarsMenu.create',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'usersMenu',
        path: '/users',
        title: 'Usuarios',
        translateKey: 'nav.usersMenu',
        icon: 'usersMenu',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['ADMIN'],
        subMenu: [],
    },
    {
        key: 'catalogs',
        path: '',
        title: 'Colecciones',
        translateKey: 'nav.catalogs',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: ['ADMIN'],
        subMenu: [
            {
                key: 'catalogs.banks',
                path: '/catalogs/banks',
                title: 'Bancos',
                translateKey: 'nav.catalogs.banks',
                icon: 'banks',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
]

export default navigationConfig
