import { PatternInput } from '@/components/shared'
import { Select, Switcher } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DatePicker from '@/components/ui/DatePicker'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { genderOptions } from '@/constants/app.constant'
import {
    CreateScholarSchemaType,
    FormSectionBaseProps,
} from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { useEffect } from 'react'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import { TbArrowsShuffle } from 'react-icons/tb'

type CustomerDetailSectionProps = FormSectionBaseProps & {
    disability?: boolean,
    onChangeDisability?: () => void
}

const UserDetailSection = ({
    control,
    errors,
    disability,
    onChangeDisability,
}: CustomerDetailSectionProps) => {
    const generateNewPassword = (
        control: ControllerRenderProps<CreateScholarSchemaType>,
    ) => {
        const newPassword = generateSecurePassword()
        control.onChange(newPassword)
    }

    const generateSecurePassword = (length = 8): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        return Array(length)
            .fill(0)
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('')
    }

    useEffect(() => {
        if (!disability) onChangeDisability?.()
    }, [disability, onChangeDisability])

    return (
        <Card id="customerDetails">
            <h4 className="mb-6">Datos personales</h4>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Nombres"
                    invalid={Boolean(errors.firstName)}
                    errorMessage={errors.firstName?.message}
                >
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="María Juanita"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Apellidos"
                    invalid={Boolean(errors.lastName)}
                    errorMessage={errors.lastName?.message}
                >
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Rosales Soriano"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Email"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                autoComplete="off"
                                placeholder="Email"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Contraseña"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <div className={`flex gap-1`}>
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Súper contraseña"
                                    {...field}
                                />
                                <Button
                                    type="button"
                                    variant={'plain'}
                                    onClick={() => {
                                        generateNewPassword(field)
                                    }}
                                >
                                    <TbArrowsShuffle size={24} />
                                </Button>
                            </div>
                        )}
                    />
                </FormItem>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
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
                    label="Fecha de nacimiento"
                    invalid={Boolean(errors.dob)}
                    errorMessage={errors.dob?.message}
                >
                    <Controller
                        name="dob"
                        control={control}
                        render={({ field }) => <DatePicker {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="DUI"
                    invalid={Boolean(errors.dui)}
                    errorMessage={errors.dui?.message}
                >
                    <Controller
                        name="dui"
                        control={control}
                        render={({ field }) => (
                            <PatternInput
                                format="########-#"
                                mask="_"
                                placeholder="DUI"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Hijos"
                    invalid={Boolean(errors.numberOfChildren)}
                    errorMessage={errors.numberOfChildren?.message}
                >
                    <Controller
                        name="numberOfChildren"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="number"
                                autoComplete="off"
                                placeholder="0"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Fecha de ingreso al programa"
                    invalid={Boolean(errors.ingressDate)}
                    errorMessage={errors.ingressDate?.message}
                >
                    <Controller
                        name="ingressDate"
                        control={control}
                        render={({ field }) => <DatePicker {...field} />}
                    />
                </FormItem>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

                <FormItem
                    label="¿Presenta alguna discapacidad?"
                    invalid={Boolean(errors.hasDisability)}
                    errorMessage={errors.hasDisability?.message}
                >
                    <Controller
                        name="hasDisability"
                        control={control}
                        render={({ field }) => <Switcher {...field} />}
                    />
                </FormItem>

                <FormItem
                    label="Descripción de la discapacidad"
                    invalid={Boolean(errors.disabilityDescription)}
                    errorMessage={errors.disabilityDescription?.message}
                >
                    <Controller
                        name="disabilityDescription"
                        disabled={!disability}
                        control={control}
                        render={({ field }) => (
                            <Input
                                textArea
                                type="text"
                                autoComplete="off"
                                placeholder={'Descripción...'}
                                {...field}
                            />
                        )}
                    />
                </FormItem>

            </div>
        </Card>
    )
}

export default UserDetailSection
