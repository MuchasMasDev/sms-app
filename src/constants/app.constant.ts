import { Authorities } from "@/@types/auth"

export const APP_NAME = 'Muchas Más SGB'
export const REDIRECT_URL_KEY = 'redirectUrl'

export const genderOptions = [
    {
        value: 'cis',
        label: 'Mujer Cis',
    },
    {
        value: 'non_binary',
        label: 'No binario',
    },
    {
        value: 'transgender',
        label: 'Transgénero',
    },
    {
        value: 'other',
        label: 'Otro',
    },
]

export const roleOptions: {
    value: Authorities
    label: string
}[] = [
        {
            value: 'ADMIN',
            label: 'Administradora',
        },
        {
            value: 'ACADEMIC',
            label: 'Académica',
        },
        {
            value: 'FINANCE',
            label: 'Financiera',
        },
        {
            value: 'PSY',
            label: 'Psicóloga',
        },
        {
            value: 'SCHOLAR',
            label: 'Becaria',
        },
        {
            value: 'SPC',
            label: 'Coordinadora de programa',
        },
        {
            value: 'SPCA',
            label: 'Técnica de programa',
        },
        {
            value: 'TUTOR',
            label: 'Tutor / Tutora',
        },
    ]
