import { Button, Form, FormItem, Input, Upload } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";


const bankFormSchema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    logo_src: z.string().optional(),
    file: z.any(),
});

export type bankFormSchemaType = z.infer<typeof bankFormSchema>;

type BankFormProps = {
    onSubmit: (values: bankFormSchemaType) => void;
    defaultValues?: bankFormSchemaType;
};

export default function BankForm(props: BankFormProps) {

    const { defaultValues, onSubmit } = props;
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control
    } = useForm({
        resolver: zodResolver(bankFormSchema),
        defaultValues: defaultValues,
    })

    const beforeUpload = (file: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const MAX_FILE_SIZE = 500000

        if (fileList.length >= 1) {
            return `Solo puedes subir 1 archivo`
        }

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = '¡Por favor sube un archivo .jpeg o .png!'
                }

                if (f.size >= MAX_FILE_SIZE) {
                    valid = '¡La imagen no puede superar los 500kb!'
                }
            }
        }

        return valid
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormItem
                asterisk
                label="Nombre del banco"
                invalid={Boolean(errors.name)}
                errorMessage={errors.name?.message}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Mi banco"
                            {...field}
                        />
                    }
                />
            </FormItem>
            <FormItem
                asterisk
                label="Logo del banco"
                invalid={Boolean(errors.file)}
                errorMessage={errors.file?.message?.toString()}
            >
                <Controller
                    name="file"
                    control={control}
                    render={({ field }) =>
                        <Upload
                            beforeUpload={beforeUpload}
                            fileList={field.value}
                            onFileRemove={(files) =>
                                field.onChange(files)
                            }
                            onChange={(files) =>
                                field.onChange(files)
                            }
                        />
                    }
                />
            </FormItem>

            <Button variant="solid" loading={isSubmitting} type="submit">
                {isSubmitting ? 'Cargando...' : ` ${defaultValues ? 'Actualizar' : 'Crear'} banco`}
            </Button>
        </Form>
    )
}
