import { UserScholarDetails } from '@/@types/scholar'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Container from '@/components/shared/Container'
import Loading from '@/components/shared/Loading'
import Button from '@/components/ui/Button'
import { apiGetScholar } from '@/services/ScholarService'
import sleep from '@/utils/sleep'
import { CreateScholarSchemaType } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import ScholarForm from '@/views/scholars/management/ScholarCreate/components/ScholarForm/ScholarForm'
import { useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import useSWR from 'swr'

const transformScholarData = (data: UserScholarDetails | undefined): CreateScholarSchemaType | undefined => {
    console.log('Transforming scholar data', data);

    if (!data) return undefined;

    // Convert string dates to Date objects
    const dobDate = data.dob ? new Date(data.dob) : new Date();
    const ingressDate = data.ingress_date ? new Date(data.ingress_date) : new Date();

    // Transform to format expected by ScholarForm
    const transformedData: CreateScholarSchemaType = {
        email: data.user.email,
        password: 'Password123', // Empty password for editing
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        dob: dobDate,
        gender: data.gender,
        hasDisability: data.has_disability,
        disabilityDescription: data.disability_description || undefined,
        numberOfChildren: data.number_of_children.toString(),
        ingressDate: ingressDate,
        emergencyContactName: data.emergency_contact_name,
        emergencyContactPhone: data.emergency_contact_phone,
        emergencyContactRelationship: data.emergency_contact_relationship,
        dui: data.dui || undefined,
        // Map the nested arrays - these need to match the schema structure
        addresses: data.scholar_addresses?.map(address => ({
            streetLine1: address.addresses.street_line_1,
            streetLine2: address.addresses.street_line_2 || '',
            districtId: 0,
            isUrban: address.addresses.is_urban
        })) || [],
        phoneNumbers: data.scholar_phone_numbers?.map(phone => ({
            number: phone.number,
            isCurrent: phone.is_current
        })) || [],
        bankAccounts: data.bank_accounts?.map(account => ({
            accountNumber: account.account_number,
            accountHolder: account.account_holder,
            accountType: account.account_type as 'SAVINGS' | 'CURRENT',
            bankId: 0,
            isPrimary: account.is_primary
        })) || []
    }

    return transformedData;
};

const ScholarEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data, isLoading } = useSWR(id ? `/api/scholars/${id}` : null, () =>
        apiGetScholar<UserScholarDetails, { id: string }>({
            id: id as string,
        }),
    )

    const transformedData = transformScholarData(data)

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: CreateScholarSchemaType) => {
        setIsSubmiting(true)
        try {
            console.log('Updating scholar with values', values);
            sleep(5000)
            toast.success('Becaria actualizada correctamente')
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
