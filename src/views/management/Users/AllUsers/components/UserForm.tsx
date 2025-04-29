import { Authorities, User } from "@/@types/auth";
import { Button, Form, FormItem, Input, Select } from "@/components/ui";
import { roleOptions } from "@/constants/app.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TbArrowsShuffle } from "react-icons/tb";
import { z } from "zod";


const userFormSchema = z.object({
    firstName: z.string().min(1, { message: "El nombre es requerido" }),
    lastName: z.string().min(1, { message: "El apellido es requerido" }),
    email: z.string().email({ message: "El correo no es válido" }),
    password: z.string().optional(),
    roles: z.array(z.any()).min(1, { message: "El rol es requerido" }),
});

export type userFormSchemaType = z.infer<typeof userFormSchema>;

type UserFormProps = {
    onSubmit: (values: userFormSchemaType) => void;
    defaultValues?: User;
};

export default function UserForm(props: UserFormProps) {

    const { defaultValues, onSubmit } = props;

    const refineValues = (values: User | undefined): userFormSchemaType => {
        if (!values) return {} as userFormSchemaType;
        return {
            firstName: values.first_name ?? "",
            lastName: values.last_name ?? "",
            email: values.email ?? "",
            roles: values.roles ?? [],
        };
    }

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control
    } = useForm<userFormSchemaType>({
        resolver: zodResolver(userFormSchema),
        defaultValues: refineValues(defaultValues),
    })

    const generateSecurePassword = (length = 8): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        return Array(length)
            .fill(0)
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('')
    }

    const generateNewPassword = (
        control: { onChange: (value: string) => void }
    ): void => {
        const newPassword = generateSecurePassword()
        control.onChange(newPassword)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>

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

            {
                !defaultValues &&
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
            }

            <FormItem
                label="Rol"
                invalid={Boolean(errors.roles)}
                errorMessage={errors.roles?.message?.toString()}
            >
                <Controller
                    name="roles"
                    control={control}
                    render={({ field }) => (
                        <Select
                            isMulti
                            placeholder="Selecciona..."
                            options={roleOptions}
                            {...field}
                            value={field.value?.map((role: Authorities) => ({
                                value: role,
                                label: roleOptions.find((option) => option.value === role)?.label
                            }))}
                            onChange={
                                (selectedOptions) => {
                                    const selectedValues = selectedOptions.map((option) => option.value)
                                    field.onChange(selectedValues)
                                }
                            }
                        />
                    )}
                />
            </FormItem>


            <Button variant="solid" loading={isSubmitting} type="submit">
                {isSubmitting ? 'Cargando...' : ` ${defaultValues ? 'Actualizar' : 'Crear'} usuario`}
            </Button>
        </Form>
    )
}
