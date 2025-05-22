import { User } from "./auth";

export type BankAccountType = 'SAVINGS' | 'CURRENT';
export type ScholarState = 'ACTIVE' | 'INACTIVE' | 'GRADUATED'

export interface ScholarPhoneNumber {
  id: number,
  is_current: boolean,
  number: string
}

export interface Bank {
  name: string;
  logo: string;
}

export interface BankAccount {
  account_number: string;
  account_holder: string;
  account_type: BankAccountType;
  bank: Bank;
}

export interface Address {
  id: number,
  street_line_1: string,
  street_line_2: string | null,
  is_urban: boolean,
  is_current: boolean,
  district: string,
  municipality: string,
  department: string
}

export type ScholarLog = {
  id: number
  scholar_id: string
  date: string
  log: string
  created_at: string
  created_by: string
}

export type ScholarDetails = {
  id: string,
  user_id: string,
  dob: string,
  gender: string | null,
  has_disability: boolean,
  disability_description: string | null,
  number_of_children: 0,
  ingress_date: string,
  egress_date: string | null,
  egress_comments: string | null,
  emergency_contact_name: string,
  emergency_contact_phone: string,
  emergency_contact_relationship: string,
  dui: string | null,
  state: ScholarState,
  created_at: string,
  created_by: string,
  user: User,
  origin_scholar_address: Address,
  current_scholar_address: Address | null,
  scholar_phone_numbers: ScholarPhoneNumber[],
  bank_account: BankAccount
}