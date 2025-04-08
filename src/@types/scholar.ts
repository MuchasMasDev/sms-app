export type UserScholarDetails = {
    id: string
    user_id: string
    dob: string
    gender: string
    has_disability: boolean
    disability_description: string | null
    number_of_children: number
    ingress_date: string
    egress_date: string | null
    egress_comments: string | null
    emergency_contact_name: string
    emergency_contact_phone: string
    emergency_contact_relationship: string
    dui: string | null
    state: 'ACTIVE' | 'INACTIVE'
    created_at: string
    created_by: string
    user: {
        id: string
        ref_code: string
        first_name: string
        last_name: string
        email: string
        role: 'SCHOLAR' | 'FINANCE' | 'SPC' | 'TUTOR' | 'ADMIN'
    }
}

export type ScholarLog = {
    id: number
    scholar_id: string
    date: string
    log: string
    created_at: string
    created_by: string
}
