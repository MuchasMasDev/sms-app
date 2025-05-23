import { Button, Card } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { FormSectionBaseProps } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'

type PhoneNumberSectionProps = FormSectionBaseProps

const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const limited = cleaned.slice(0, 8)
    if (limited.length > 4) return `${limited.slice(0, 4)}-${limited.slice(4)}`
    return limited
}

const PhoneNumberSection = ({ control, errors }: PhoneNumberSectionProps) => {
    const [newPhoneValue, setNewPhoneValue] = useState('')

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'phoneNumbers',
    })

    const handleAddPhone = () => {
        if (newPhoneValue.match(/^\d{4}-\d{4}$/)) {
            // Sí es el primer teléfono, marcarlo como actual
            append({
                number: newPhoneValue,
                isCurrent: fields.length === 0
            })
            setNewPhoneValue('')
        }
    }

    const handleSetCurrent = (index: number) => {
        // Actualizar todos los teléfonos para que solo el seleccionado sea actual
        fields.forEach((field, i) => {
            update(i, {
                ...field,
                isCurrent: i === index
            })
        })
    }

    return (
        <Card id="phoneInformation" className="w-full">
            <h4 className="mb-6">Contacto de la becaria</h4>

            {/* Form to add new phone number */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-2">
                    <FormItem
                        label="Número de teléfono"
                        invalid={false}
                    >
                        <Input
                            type="tel"
                            autoComplete="off"
                            placeholder="7848-5748"
                            value={newPhoneValue}
                            maxLength={9}
                            onChange={(e) => {
                                const formatted = formatPhoneNumber(e.target.value)
                                setNewPhoneValue(formatted)
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleAddPhone()
                                }
                            }}
                        />
                    </FormItem>
                </div>
                <div className="md:col-span-2 flex items-center">
                    <Button
                        type="button"
                        disabled={!newPhoneValue.match(/^\d{4}-\d{4}$/)}
                        onClick={handleAddPhone}
                    >
                        Agregar
                    </Button>
                </div>
            </div>

            {/* List of phone numbers */}
            {fields.length > 0 && (
                <div className="mt-4">
                    <h6 className="m-4">Números telefónicos registrados</h6>
                    <div className="grid gap-3">
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <Controller
                                    name={`phoneNumbers.${index}.isCurrent`}
                                    control={control}
                                    render={({ field: fieldProps }) => (
                                        <Card
                                            className={`p-3 cursor-pointer transition-all duration-200 ${fieldProps.value
                                                    ? "border-2 border-blue-500 bg-blue-50"
                                                    : "bg-gray-50 hover:bg-gray-100"
                                                }`}
                                            onClick={() => {
                                                handleSetCurrent(index)
                                                fieldProps.onChange(true)
                                            }}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-lg text-gray-800">
                                                        {field.number}
                                                    </span>
                                                    {fieldProps.value && (
                                                        <span className="text-sm text-blue-600 font-medium">
                                                            Teléfono principal
                                                        </span>
                                                    )}
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant='solid'
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        remove(index)
                                                    }}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </Card>
                                    )}
                                />
                                {errors.phoneNumbers?.[index] && (
                                    <div className="mt-2 text-red-500 text-sm">
                                        {errors.phoneNumbers[index]?.number?.message}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {errors.phoneNumbers && 'root' in errors.phoneNumbers && (
                <div className="mt-2 text-red-500">
                    {errors.phoneNumbers.root?.message}
                </div>
            )}
        </Card>
    )
}

export default PhoneNumberSection