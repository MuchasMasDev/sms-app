import { User } from '@/@types/auth'
import { UserScholarDetails } from '@/@types/scholar'
import { useAuth } from '@/auth'
import { AuthorityCheck } from '@/components/shared'
import { Select } from '@/components/ui'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { Form, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Upload from '@/components/ui/Upload'
import { genderOptions } from '@/constants/app.constant'
import { apiUpdateUser } from '@/services/AuthService'
import { apiGetScholar } from '@/services/ScholarService'
import { apiUpdateScholar } from '@/services/ScholarsService'
import { apiUpdateUserPhoto } from '@/services/UserService'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { HiOutlineUser } from 'react-icons/hi'
import { TbPlus } from 'react-icons/tb'
import { toast } from 'sonner'
import useSWR from 'swr'
import type { ZodType } from 'zod'
import { z } from 'zod'

type ProfileSchema = {
    firstName: string
    phone: string
    gender: string
    lastName: string
    email: string
    img: string
}

const validationSchema: ZodType<ProfileSchema> = z.object({
    firstName: z.string().min(1, { message: 'El nombre es requerido' }),
    lastName: z.string().min(1, { message: 'El apellido es requerido' }),
    phone: z.string(),
    gender: z.string(),
    email: z
        .string()
        .min(1, { message: 'El email es requerido' })
        .email({ message: 'El email no es válido' }),
    img: z.string(),
})

const SettingsProfile = () => {
    const { user, setUser } = useAuth()
    const [isUploading, setIsUploading] = useState(false)
    const { data } = useSWR<UserScholarDetails>('own/scholar', () =>
        apiGetScholar<UserScholarDetails, Record<string, unknown>>({ id: user.id })
    )

    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'El formato de la imagen no es válido'
                }
            }
        }

        return valid
    }

    const handlePhotoChange = async (files: File[]) => {
        if (files.length > 0 && user) {
            try {
                setIsUploading(true)
                // Create FormData object
                const formData = new FormData()
                formData.append('file', files[0])

                // Upload photo and get new photo URL
                await apiUpdateUserPhoto<User>({
                    data: formData,
                    id: user.id || '',
                }).then((response) => {
                    setUser(response)
                })

                setValue('img', URL.createObjectURL(files[0]))

                toast.success('Foto de perfil actualizada correctamente')
            } catch (error) {
                console.error('Error uploading photo:', error)
                toast.error('Error al subir la foto de perfil')
            } finally {
                setIsUploading(false)
            }
        }
    }

    const {
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
        control,
    } = useForm<ProfileSchema>({
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (user) {
            reset({
                firstName: user.first_name || '',
                lastName: user.last_name || '',
                email: user.email || '',
                img: user.profile_img_src || '',
                phone: data?.scholar_phone_numbers[0].number || '',
                gender: data?.gender || '',
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const onSubmit = async (values: ProfileSchema) => {
        let response: User | null = null
        if (user)
            response = await apiUpdateUser<User>({
                id: user.id || '',
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email
            })

        if (user.roles?.includes('SCHOLAR')) {
            await apiUpdateScholar({
                gender: values.gender,
                phoneNumbers: [{ number: values.phone }]
            },
                user.id || ''
            )
        }

        if (response) {
            setUser(response)
            toast.success(`${response.first_name}, tu perfil ha sido actualizado correctamente`)
        }

        reset({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            img: values.img,
        })
    }

    return (
        <>
            <h4 className="mb-8">Perfil</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                    <Controller
                        name="img"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center gap-4">
                                <Avatar
                                    size={90}
                                    className="border-4 border-white bg-gray-100 text-gray-300 shadow-lg"
                                    icon={<HiOutlineUser />}
                                    src={field.value}
                                />
                                <div className="flex items-center gap-2">
                                    <Upload
                                        showList={false}
                                        uploadLimit={1}
                                        beforeUpload={beforeUpload}
                                        disabled={isUploading}
                                        onChange={handlePhotoChange}
                                    >
                                        <Button
                                            variant="solid"
                                            size="sm"
                                            type="button"
                                            icon={<TbPlus />}
                                            loading={isUploading}
                                        >
                                            Subir foto
                                        </Button>
                                    </Upload>
                                </div>
                            </div>
                        )}
                    />
                </div>
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
                                    placeholder="Nombres"
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
                                    placeholder="Apellidos"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                <AuthorityCheck
                    authority={['SCHOLAR']}
                    userAuthority={user.roles}
                >
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
                            label="Teléfono celular"
                            invalid={Boolean(errors.phone)}
                            errorMessage={errors.phone?.message}
                        >
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="tel"
                                        autoComplete="off"
                                        placeholder="7848-5748"
                                        maxLength={9}
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                </AuthorityCheck>
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

export default SettingsProfile