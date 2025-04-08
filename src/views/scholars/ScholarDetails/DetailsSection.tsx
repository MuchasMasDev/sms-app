import { UserScholarDetails } from '@/@types/scholar'
import Card from '@/components/ui/Card'
import { genderOptions } from '@/constants/app.constant'
import { PiCheckCircle, PiXCircle } from 'react-icons/pi'

type DetailsSectionProps = {
    data: UserScholarDetails
}

type DetailType = {
    label: string
    value: string | number | boolean | null | undefined
}

const Detail = ({ label, value }: DetailType) => {
    return (
        <span className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            <span className={`font-semibold`}>{label}</span>
            <span>{value || 'N/A'}</span>
        </span>
    )
}

const BooleanDetail = ({ label, value }: DetailType) => {
    return (
        <span className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            <span className={`font-semibold`}>{label}</span>
            {
                value
                    ? <PiCheckCircle className='text-green-500' />
                    : <PiXCircle className='text-red-500' />
            }
        </span>
    )
}

const BankLabels: Record<string, string> = {
    'SAVINGS': 'Ahorro',
    'CURRENT': 'Corriente',
}

const DetailsSection = ({ data }: DetailsSectionProps) => {

    const details: DetailType[] = [
        {
            label: "Nombre completo",
            value: `${data.user.first_name} ${data.user.last_name}`
        },
        {
            label: "Email",
            value: data.user.email
        },
        {
            label: "Fecha de nacimiento",
            value: new Date(data.dob).toLocaleDateString()
        },
        {
            label: "Género",
            value: genderOptions.find(option => option.value === data.gender)?.label || data.gender
        },
        {
            label: "Número de hijos",
            value: String(data.number_of_children)
        },
        {
            label: "DUI",
            value: data.dui || 'N/A'
        }
    ]

    const emergencyDetails: DetailType[] = [
        {
            label: "Nombre",
            value: data.emergency_contact_name
        },
        {
            label: "Teléfono",
            value: data.emergency_contact_phone
        },
        {
            label: "Relación",
            value: data.emergency_contact_relationship
        }
    ]

    return (
        <>
            <h4 className="mt-4">Detalles de la becaria</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Card>
                    <div className="font-bold heading-text">
                        Información personal
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                        {details.map((detail, index) => (
                            <Detail
                                key={index}
                                label={detail.label}
                                value={detail.value}
                            />
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="font-bold heading-text">
                        Contacto de emergencia
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                        {emergencyDetails.map((detail, index) => (
                            <Detail
                                key={index}
                                label={detail.label}
                                value={detail.value}
                            />
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="font-bold heading-text">
                        Discapacidad
                    </div>
                    <div className="mt-4 flex flex-col gap-1">
                        <Detail
                            label="Padece"
                            value={`${data.has_disability ? 'Sí' : 'No'}`}
                        />
                        <Detail
                            label="Descripción"
                            value={data.disability_description || 'N/A'}
                        />
                    </div>
                </Card>
                <Card>
                    <div className="font-bold heading-text">
                        Residencia
                    </div>
                    {
                        data.scholar_addresses?.map((address, index) => (
                            <div key={index} className={`mt-4 flex flex-col gap-1 ${data.scholar_addresses && index < data.scholar_addresses.length - 1 && ' border-b-2 border-gray-200 pb-4'}`}>
                                <BooleanDetail
                                    label="Dirección actual"
                                    value={address.is_current}
                                />
                                <BooleanDetail
                                    label="Es zona urbana"
                                    value={address.addresses.is_urban}
                                />
                                <Detail
                                    label="Dirección"
                                    value={address.addresses.street_line_1}
                                />
                                <Detail
                                    label="Dirección 2"
                                    value={address.addresses.street_line_2}
                                />
                                <Detail
                                    label="Número de apartamento"
                                    value={address.addresses.apartment_number}
                                />
                                <Detail
                                    label="Código postal"
                                    value={address.addresses.postal_code}
                                />
                                <Detail
                                    label="Municipio"
                                    value={address.addresses.municipality}
                                />
                                <Detail
                                    label="Departamento"
                                    value={address.addresses.department}
                                />
                            </div>
                        ))
                    }
                </Card>

                <Card>
                    <div className="font-bold heading-text">
                        Teléfonos
                    </div>
                    {
                        data.scholar_phone_numbers?.map((phone, index) => (
                            <>
                                <div key={index} className={`mt-4 flex flex-col gap-1 ${data.scholar_phone_numbers && index < data.scholar_phone_numbers.length - 1 && ' border-b-2 border-gray-200 pb-4'}`}>
                                    <BooleanDetail
                                        label="Teléfono móvil"
                                        value={phone.is_mobile}
                                    />
                                    <BooleanDetail
                                        label="Teléfono actual"
                                        value={phone.is_current}
                                    />
                                    <Detail
                                        label="Número"
                                        value={phone.number}
                                    />
                                </div>
                            </>
                        ))
                    }
                </Card>
                <Card>
                    <div className="font-bold heading-text">
                        Cuenta bancaria
                    </div>
                    {
                        data.bank_accounts?.map((account, index) => (
                            <div key={index} className={`mt-4 flex flex-col gap-1 ${data.bank_accounts && index < data.bank_accounts.length - 1 && ' border-b-2 border-gray-200 pb-4'}`}>
                                <BooleanDetail
                                    label="Cuenta principal"
                                    value={account.is_primary}
                                />
                                <Detail
                                    label="Número de cuenta"
                                    value={account.account_number}
                                />
                                <Detail
                                    label="Tipo de cuenta"
                                    value={BankLabels[account.account_type] || account.account_type}
                                />
                                <Detail
                                    label="Banco"
                                    value={account.bank.name}
                                />
                            </div>
                        ))
                    }
                </Card>

            </div>
        </>
    )
}

export default DetailsSection
