import { ScholarDetails } from '@/@types/scholar'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Container from '@/components/shared/Container'
import Loading from '@/components/shared/Loading'
import Button from '@/components/ui/Button'
import { apiGetMunicipalities, Municipality } from '@/services/CommonService'
import { apiGetScholar } from '@/services/ScholarService'
import { apiUpdateScholar } from '@/services/ScholarsService'
import { CreateScholarSchemaType } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import ScholarForm from '@/views/scholars/management/ScholarCreate/components/ScholarForm/ScholarForm'
import { useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import useSWR from 'swr'

const transformScholarData = (data: ScholarDetails | undefined, disx: Municipality[] | undefined): CreateScholarSchemaType | undefined => {
    if (!data || !disx) return undefined;

    const dobDate = data.dob ? new Date(data.dob) : new Date();
    const ingressDate = data.ingress_date ? new Date(data.ingress_date) : new Date();

    const transformedData: CreateScholarSchemaType = {
        email: data.user.email ?? '',
        password: 'Password123', // Empty password for editing
        firstName: data.user.first_name ?? '',
        lastName: data.user.last_name ?? '',
        dob: dobDate,
        gender: data.gender ?? '',
        hasDisability: data.has_disability,
        disabilityDescription: data.disability_description || undefined,
        numberOfChildren: data.number_of_children.toString(),
        ingressDate: ingressDate,
        emergencyContactName: data.emergency_contact_name,
        emergencyContactPhone: data.emergency_contact_phone,
        emergencyContactRelationship: data.emergency_contact_relationship,
        dui: data.dui || undefined,
        addresses: [{
            isUrban: data.origin_scholar_address.is_urban,
            streetLine1: data.origin_scholar_address.street_line_1,
            streetLine2: data.origin_scholar_address.street_line_2 || undefined,
            districtId: disx?.find(d => d.name === data.origin_scholar_address.district || '')?.id || 0,
        }],
        phoneNumbers: data.scholar_phone_numbers?.map(phone => ({
            id: phone.id,
            number: phone.number,
            isCurrent: phone.is_current
        })) || [],
        bankAccounts: data.bank_account ? [{
            accountNumber: data.bank_account.account_number,
            accountType: data.bank_account.account_type,
            accountHolder: data.bank_account.account_holder,
            bankId: 1,
        }] : []
    }

    return transformedData;
};

const ScholarEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: disx } = useSWR(['/api/residences/municipalities'], () => apiGetMunicipalities())
    const { data, isLoading, mutate } = useSWR(id ? `/api/scholars/${id}` : null, () =>
        apiGetScholar<ScholarDetails, { id: string }>({
            id: id as string,
        }),
    )

    const transformedData = transformScholarData(data, disx)

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: CreateScholarSchemaType) => {
        setIsSubmiting(true)
        try {
            const response = await apiUpdateScholar(values, id as string)
            if (response) {
                mutate()
                toast.success('Becaria actualizada correctamente')
            }
        }
        catch (error) {
            console.error('Error updating scholar', error)
            toast.error('Error al actualizar la becaria')
        }
        finally {
            setIsSubmiting(false)
            navigate('/scholars')
        }
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
        <Loading loading={isLoading}>
            <ScholarForm defaultValues={transformedData} onFormSubmit={handleFormSubmit}>
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
                                Guardar cambios
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
        </Loading>
    )
}

export default ScholarEdit
