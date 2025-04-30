import type { Control, FieldErrors } from 'react-hook-form'
import { z } from 'zod'

export const CreateAddressDtoSchema = z.object({
    streetLine1: z.string().min(1, 'La línea de dirección 1 es obligatoria'),
    streetLine2: z.string().optional(),
    districtId: z
        .number()
        .int('El ID del distrito debe ser un número entero'),
    isUrban: z.boolean().default(false),
})

export type CreateAddressSchemaType = z.infer<typeof CreateAddressDtoSchema>

export const CreatePhoneNumberDtoSchema = z.object({
    number: z.string().min(1, 'El número de teléfono es obligatorio'),
    isCurrent: z.boolean().default(true).optional(),
})

export type CreatePhoneNumberSchemaType = z.infer<
    typeof CreatePhoneNumberDtoSchema
>

export const CreateBankAccountDtoSchema = z.object({
    accountNumber: z.string().min(1, 'El número de cuenta es obligatorio'),
    accountHolder: z.string().min(1, 'El titular de la cuenta es obligatorio'),
    accountType: z.enum(['SAVINGS', 'CURRENT'] as const),
    bankId: z.number().int('El ID de banco debe ser un número entero'),
    isPrimary: z.boolean().default(true).optional(),
})

export type CreateBankAccountSchemaType = z.infer<
    typeof CreateBankAccountDtoSchema
>

export const CreateScholarSchema = z
    .object({
        email: z
            .string()
            .min(1, 'El correo electrónico es obligatorio')
            .email('Correo electrónico inválido'),
        password: z
            .string()
            .optional(),
        firstName: z.string().min(1, 'El nombre es obligatorio'),
        lastName: z.string().min(1, 'El apellido es obligatorio'),
        dob: z.date({ message: 'La fecha de nacimiento no debe ir vacía' }),
        gender: z.string().min(1, 'Selecciona la discapacidad'),
        hasDisability: z.boolean(),
        disabilityDescription: z
            .string()
            .max(500, 'Máximo 500 caracteres')
            .optional(),
        numberOfChildren: z.string().optional().default('0'),
        dui: z.string().max(10, 'Máximo 9 caracteres').optional(),
        ingressDate: z.date({ message: 'La fecha de ingreso no debe ir vacía' }),
        emergencyContactName: z
            .string()
            .min(1, 'Requerido')
            .max(100, 'Máximo 100 caracteres'),
        emergencyContactPhone: z
            .string()
            .min(1, 'Requerido')
            .max(15, 'Máximo 15 caracteres'),
        emergencyContactRelationship: z
            .string()
            .min(1, 'Requerido')
            .max(30, 'Máximo 30 caracteres'),
        addresses: z
            .array(CreateAddressDtoSchema)
            .min(1, 'Se requiere al menos una dirección'),
        phoneNumbers: z
            .array(CreatePhoneNumberDtoSchema)
            .min(1, 'Se requiere al menos un número de contacto'),
        bankAccounts: z
            .array(CreateBankAccountDtoSchema)
            .min(1, 'Se requiere al menos una cuenta bancaria'),
    })
    .refine(
        (data) => {
            if (
                data.hasDisability !== false &&
                data.hasDisability !== undefined &&
                data.hasDisability !== null
            ) {
                return (
                    data.disabilityDescription &&
                    data.disabilityDescription.trim().length > 0
                )
            }
            return true
        },
        {
            message: 'La descripción de la discapacidad es obligatoria',
            path: ['disabilityDescription'],
        },
    )

export type CreateScholarSchemaType = z.infer<typeof CreateScholarSchema>

export type FormSectionBaseProps = {
    control: Control<CreateScholarSchemaType>
    errors: FieldErrors<CreateScholarSchemaType>
}
