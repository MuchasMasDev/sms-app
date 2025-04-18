export type BankAccountType = 'SAVINGS' | 'CURRENT';

export interface Address {
  street_line_1: string;
  street_line_2: string | null;
  apartment_number: string | null;
  postal_code: string | null;
  is_urban: boolean;
  municipality: string;
  department: string;
}

export interface ScholarAddress {
  is_current: boolean;
  addresses: Address;
}

export interface ScholarPhoneNumber {
  is_mobile: boolean;
  is_current: boolean;
  number: string;
}

export interface Bank {
  name: string;
  logo: string;
}

export interface BankAccount {
  account_number: string;
  is_primary: boolean;
  account_type: BankAccountType;
  bank: Bank;
}


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
    scholar_addresses: ScholarAddress[] | undefined;
    scholar_phone_numbers: ScholarPhoneNumber[] | undefined;
    bank_accounts: BankAccount[] | undefined;
}

export type ScholarLog = {
    id: number
    scholar_id: string
    date: string
    log: string
    created_at: string
    created_by: string
}
