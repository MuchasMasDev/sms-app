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
        key: 'adminMenu',
        path: '',
        title: 'Administrador',
        translateKey: 'nav.adminMenu',
        icon: 'adminMenu',
        type: NAV_ITEM_TYPE_TITLE,
        authority: ['ADMIN'],
        subMenu: [
            {
                key: 'adminMenu.scholarsMenu',
                path: '',
                title: 'Becarias',
                translateKey: 'nav.adminMenu.scholarsMenu',
                icon: 'scholarsMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'adminMenu.scholarsMenu.all',
                        path: '/scholars',
                        title: 'Todos los registros',
                        translateKey: 'nav.adminMenu.scholarsMenu.all',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }, {
                        key: 'adminMenu.scholarsMenu.create',
                        path: '/scholars/new',
                        title: 'Agregar una becaria',
                        translateKey: 'nav.adminMenu.scholarsMenu.create',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ],
            },
        ],
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
