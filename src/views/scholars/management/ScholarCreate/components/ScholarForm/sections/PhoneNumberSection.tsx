import { Card, Switcher } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { FormSectionBaseProps } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

type PhoneNumberSectionProps = FormSectionBaseProps

const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const limited = cleaned.slice(0, 8)
    if (limited.length > 4) return `${limited.slice(0, 4)}-${limited.slice(4)}`
    return limited
}

const PhoneNumberSection = ({ control, errors }: PhoneNumberSectionProps) => {

    const [phoneValue, setPhoneValue] = useState('')

    return (
        <Card id='phoneInformation' className='w-full'>
            <h4 className="mb-6">Contacto de la becaria</h4>
            <div className="grid md:grid-cols-3 gap-4">
                <FormItem
                    label="Número de teléfono"
                    invalid={Boolean(errors.phoneNumbers?.[0]?.number)}
                    errorMessage={errors.phoneNumbers?.[0]?.number?.message}
                >
                    <Controller
                        name="phoneNumbers.0.number"
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
                <FormItem
                    label="¿Es un número de contacto celular?"
                    invalid={Boolean(errors.phoneNumbers?.[0]?.isMobile)}
                    errorMessage={errors.phoneNumbers?.[0]?.isMobile?.message}
                >
                    <Controller
                        name="phoneNumbers.0.isMobile"
                        control={control}
                        render={({ field }) => (
                            <Switcher
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="¿Es el teléfono actual?"
                    invalid={Boolean(errors.phoneNumbers?.[0]?.isCurrent)}
                    errorMessage={errors.phoneNumbers?.[0]?.isCurrent?.message}
                >
                    <Controller
                        name="phoneNumbers.0.isCurrent"
                        control={control}
                        render={({ field }) => (
                            <Switcher
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default PhoneNumberSection