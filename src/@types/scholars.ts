import { User } from '@/@types/auth'

export interface Scholar {
    id: string
    user_id: string
    dob: Date
    gender: string | null
    has_disability: boolean | null
    disability_description: string | null
    number_of_children: number | null
    ingress_date: Date | null
    egress_date: Date | null
    egress_comments: string | null
    emergency_contact_name: string | null
    emergency_contact_phone: string | null
    emergency_contact_relationship: string | null
    dui: string | null
    state: ScholarState
    created_at: Date
    created_by: string
    user: User
}

export type ScholarState = 'ACTIVE' | 'INACTIVE' | 'GRADUATED'
