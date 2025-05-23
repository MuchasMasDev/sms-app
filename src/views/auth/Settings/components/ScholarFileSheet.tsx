import { ScholarDetails } from '@/@types/scholar'
import { Input, Select } from '@/components/ui'
import Button from '@/components/ui/Button'
import { Form, FormItem } from '@/components/ui/Form'
import { genderOptions } from '@/constants/app.constant'
import { apiGetScholarByUser } from '@/services/ScholarService'
import { apiUpdateScholar } from '@/services/ScholarsService'
import DetailsSection from '@/views/scholars/ScholarDetails/DetailsSection'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useSWR from 'swr'
import type { ZodType } from 'zod'
import { z } from 'zod'

type ProfileSchema = {
    gender: string
}

const validationSchema: ZodType<ProfileSchema> = z.object({
    gender: z.string()
})

const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const limited = cleaned.slice(0, 8)
    if (limited.length > 4) return `${limited.slice(0, 4)}-${limited.slice(4)}`
    return limited
}

const ScholarFileSheet = ({ userId }: { userId: string }) => {

    const { data, mutate } = useSWR('/own/scholar/', () => { return apiGetScholarByUser<ScholarDetails, { id: string }>({ id: userId }) })
    const [newPhoneValue, setNewPhoneValue] = useState(formatPhoneNumber(data?.scholar_phone_numbers[0]?.number ?? ''))

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm<ProfileSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values: ProfileSchema) => {
        const phone = newPhoneValue.replace(/-/g, '')
        const scholarId = data?.id

        if (scholarId) {
            await apiUpdateScholar({
                gender: values.gender,
                phoneNumbers: data.scholar_phone_numbers.map((phoneNumber) => {
                    return {
                        id: phoneNumber.id,
                        number: phoneNumber.is_current ? phone : phoneNumber.number,
                        isCurrent: phoneNumber.is_current,
                    }
                }),
            }, data.id)
            await mutate()
            console.log('values', values);
        }
    }

    return (
        <>
            <h4 className="mb-8">Ficha de información</h4>
            {
                data &&
                <DetailsSection data={data} />
            }
            <Form className='my-4' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label="Género"
                        invalid={Boolean(errors.gender)}
                        errorMessage={errors.gender?.message}
                    >
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder={'Selecciona...'}
                                    options={genderOptions}
                                    {...field}
                                    value={genderOptions.find(
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
                        />
                    </FormItem>

                </div>
                <div className="flex justify-end">
                    <Button
                        variant="solid"
                        type="submit"
                        loading={isSubmitting}
                    >
                        Guardar cambios
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default ScholarFileSheet