import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { FormSectionBaseProps } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { Select } from '@/components/ui'
import { useState } from 'react'

type CustomerDetailSectionProps = FormSectionBaseProps

const emergencyContactRelationshipOptions = [
    {
        label: 'Padre',
        value: 'Padre',
    },
    {
        label: 'Madre',
        value: 'Madre',
    },
    {
        label: 'Hijo(a)',
        value: 'Hijo(a)',
    },
    {
        label: 'Hermano(a)',
        value: 'Hermano(a)',
    },
    {
        label: 'Abuelo(a)',
        value: 'Abuelo(a)',
    },
    {
        label: 'Esposo(a) / Pareja',
        value: 'Esposo(a) / Pareja',
    },
    {
        label: 'Tutor/a legal',
        value: 'Tutor/a legal',
    },
    {
        label: 'Otro',
        value: 'Otro',
    },
]

const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const limited = cleaned.slice(0, 8)
    if (limited.length > 4) return `${limited.slice(0, 4)}-${limited.slice(4)}`
    return limited
}

const EmergencyContactSection = ({
    control,
    errors,
}: CustomerDetailSectionProps) => {
    const [phoneValue, setPhoneValue] = useState(control._defaultValues.emergencyContactPhone ?? '')

    return (
        <Card id="emergencyContact">
            <h4 className="mb-6">Contacto de emergencia</h4>

            <div className="grid md:grid-cols-3 gap-4">
                <FormItem
                    label="Nombre completo"
                    invalid={Boolean(errors.emergencyContactName)}
                    errorMessage={errors.emergencyContactName?.message}
                >
                    <Controller
                        name="emergencyContactName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Rosa Adalberta del Carmen"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Parentesco"
                    invalid={Boolean(errors.emergencyContactRelationship)}
                    errorMessage={errors.emergencyContactRelationship?.message}
                >
                    <Controller
                        name="emergencyContactRelationship"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder={'Selecciona...'}
                                options={emergencyContactRelationshipOptions}
                                {...field}
                                value={emergencyContactRelationshipOptions.find(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(selected) => {
                                    field.onChange(selected?.value ?? '')
                                }}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Teléfono de contacto"
                    invalid={Boolean(errors.emergencyContactPhone)}
                    errorMessage={errors.emergencyContactPhone?.message}
                >
                    <Controller
                        name="emergencyContactPhone"
                        control={control}
                        rules={{
                            required: 'El teléfono es obligatorio',
                            pattern: {
                                value: /^\d{4}-\d{4}$/,
                                message: 'Formato inválido (use ####-####)',
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                type="tel"
                                autoComplete="off"
                                placeholder="7848-5748"
                                value={phoneValue}
                                maxLength={9}
                                onChange={(e) => {
                                    const formatted = formatPhoneNumber(
                                        e.target.value,
                                    )
                                    setPhoneValue(formatted)
                                    field.onChange(formatted)
                                }}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default EmergencyContactSection
