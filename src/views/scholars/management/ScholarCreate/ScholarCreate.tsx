import { useState } from 'react'
import Button from '@/components/ui/Button'
import Container from '@/components/shared/Container'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { useNavigate } from 'react-router-dom'
import { TbTrash } from 'react-icons/tb'
import { toast } from 'sonner'
import { CreateScholarSchemaType } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import ScholarForm from '@/views/scholars/management/ScholarCreate/components/ScholarForm/ScholarForm'

const ScholarCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: CreateScholarSchemaType) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        await sleep(800)
        setIsSubmiting(false)
        toast.success('Becaria registrada con éxito')
        navigate('/scholars')
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.success('Datos descartados')
        navigate('/scholars')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <ScholarForm onFormSubmit={handleFormSubmit}>
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Descartar
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Completar registro
                            </Button>
                        </div>
                    </div>
                </Container>
            </ScholarForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Descartar Cambios"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Esta acción <b> descartará </b>cualquier información que
                    exista actualmente en esta pantalla. ¿Quieres continuar?
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ScholarCreate
