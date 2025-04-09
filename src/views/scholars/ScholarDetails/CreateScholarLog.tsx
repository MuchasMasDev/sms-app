import { Button, Dialog, Form, FormItem, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import type { ZodType } from 'zod'
import { z } from 'zod'
import { useEffect } from 'react'
import { apiCreateScholarLog } from '@/services/ScholarsService'
import { toast } from 'sonner'
import { mutate } from 'swr'

type CreateScholarLogProps = {
    isOpen: boolean
    scholarId: string
    onDrawerClose?: () => void
    onSuccess?: () => void
}

export type Log = {
    log: string
    date?: Date
}

const validationSchema: ZodType<Log> = z.object({
    log: z.string().min(1, "La entrada es obligatoria"),
    date: z.date().optional().default(() => new Date()),
})

const CreateScholarLog = ({ isOpen, scholarId, onDrawerClose, onSuccess }: CreateScholarLogProps) => {
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        reset
    } = useForm<Log>({
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isOpen) {
            reset({ log: '' });
        }
    }, [isOpen, reset]);

    const handleFormSubmit = async (data: Log) => {
        try {
            await apiCreateScholarLog(data, scholarId);

            mutate([`/logbook/scholar/${scholarId}`, { id: scholarId }]);

            toast.success('Bitácora creada con éxito');
            reset({ log: '' });

            if (onSuccess) {
                onSuccess();
            }

            if (onDrawerClose) {
                onDrawerClose();
            }
        } catch (error) {
            console.error('Error creating log:', error);
            toast.error('Error al crear la bitácora');
        }
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
        >
            <h4>Registrar una nueva entrada</h4>
            <Form className="mt-6" onSubmit={handleSubmit(handleFormSubmit)}>
                <FormItem
                    label="Bitácora"
                    invalid={Boolean(errors.log)}
                    errorMessage={errors.log?.message}
                >
                    <Controller
                        name="log"
                        control={control}
                        render={({ field }) => (
                            <Input
                                textArea
                                autoComplete="off"
                                placeholder="Escribe aquí..."
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <Button
                    block
                    variant="solid"
                    type="submit"
                    loading={isSubmitting}
                >
                    Crear entrada
                </Button>
            </Form>
        </Dialog>
    )
}

export default CreateScholarLog