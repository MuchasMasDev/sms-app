import { ScholarDetails } from '@/@types/scholar'
import Card from '@/components/ui/Card'
import { genderOptions } from '@/constants/app.constant'
import { PiCheckCircle, PiXCircle } from 'react-icons/pi'

type DetailsSectionProps = {
    data: ScholarDetails
}

type DetailType = {
    label: string
    value: string | number | boolean | null | undefined
}

const Detail = ({ label, value }: DetailType) => {
    return (
        <span className="grid grid-cols-3 gap-2">
            <span className="font-semibold">{label}</span>
            <span className="col-span-2 break-words overflow-hidden">{value || 'N/A'}</span>
        </span>
    )
}

const BooleanDetail = ({ label, value }: DetailType) => {
    return (
        <span className="grid grid-cols-3 gap-2">
            <span className="font-semibold">{label}</span>
            <span className="col-span-2">
                {value ? (
                    <PiCheckCircle size={24} className="text-green-500" />
                ) : (
                    <PiXCircle size={24} className="text-red-500" />
                )}
            </span>
        </span>
    )
}

const BankLabels: Record<string, string> = {
    SAVINGS: 'Ahorro',
    CHECKING: 'Corriente', // Changed from CURRENT to CHECKING to match the type
}

const DetailsSection = ({ data }: DetailsSectionProps) => {
    const details: DetailType[] = [
        {
            label: 'Nombre completo',
            value: `${data.user.first_name} ${data.user.last_name}`,
        },
        {
            label: 'Email',
            value: data.user.email,
        },
        {
            label: 'Fecha de nacimiento',
            value: new Date(data.dob).toLocaleDateString(),
        },
        {
            label: 'Género',
            value:
                genderOptions.find((option) => option.value === data.gender)
                    ?.label || data.gender,
        },
        {
            label: 'Número de hijos',
            value: String(data.number_of_children),
        },
        {
            label: 'DUI',
            value: data.dui || 'N/A',
        },
    ]

    const emergencyDetails: DetailType[] = [
        {
            label: 'Nombre',
            value: data.emergency_contact_name,
        },
        {
            label: 'Teléfono',
            value: data.emergency_contact_phone,
        },
        {
            label: 'Relación',
            value: data.emergency_contact_relationship,
        },
    ]

    return (
        <>
            <h4 className="mt-4">Detalles de la becaria</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="font-bold heading-text">Discapacidad</div>
                    <div className="mt-4 flex flex-col gap-1">
                        <BooleanDetail
                            label="Padece"
                            value={data.has_disability}
                        />
                        <Detail
                            label="Descripción"
                            value={data.disability_description || 'N/A'}
                        />
                    </div>
                </Card>
                <Card>
                    <div className="font-bold heading-text">Residencias</div>
                    <div className="mt-4 flex flex-col gap-1">
                        {/* Render current address */}
                        {data.current_scholar_address && (
                            <div className="border-b-2 border-gray-200 pb-4">
                                <p className='w-full text-center font-bold border-b-2 border-gray-200 mb-4 pb-2'>
                                    Dirección actual de residencia
                                </p>
                                <BooleanDetail
                                    label="Es zona urbana"
                                    value={data.current_scholar_address.is_urban}
                                />
                                <Detail
                                    label="Dirección"
                                    value={`${data.current_scholar_address.street_line_1} ${data.current_scholar_address.street_line_2 ? ', ' + data.current_scholar_address.street_line_2 : ''}`}
                                />
                                <Detail
                                    label="Municipio"
                                    value={data.current_scholar_address.district}
                                />
                                <Detail
                                    label="Distrito"
                                    value={data.current_scholar_address.municipality}
                                />
                                <Detail
                                    label="Departamento"
                                    value={data.current_scholar_address.department}
                                />
                            </div>
                        )}

                        {/* Render origin address */}
                        {data.origin_scholar_address && (
                            <div>
                                <p className='w-full text-center font-bold border-b-2 border-gray-200 mb-4 pb-2'>
                                    Dirección de origen
                                </p>
                                <BooleanDetail
                                    label="Es zona urbana"
                                    value={data.origin_scholar_address.is_urban}
                                />
                                <Detail
                                    label="Dirección"
                                    value={`${data.origin_scholar_address.street_line_1} ${data.origin_scholar_address.street_line_2 ? ', ' + data.origin_scholar_address.street_line_2 : ''}`}
                                />
                                <Detail
                                    label="Municipio"
                                    value={data.origin_scholar_address.district}
                                />
                                <Detail
                                    label="Distrito"
                                    value={data.origin_scholar_address.municipality}
                                />
                                <Detail
                                    label="Departamento"
                                    value={data.origin_scholar_address.department}
                                />
                            </div>
                        )}

                        {!data.current_scholar_address && !data.origin_scholar_address && (
                            <Detail label="Sin direcciones registradas" value="" />
                        )}
                    </div>
                </Card>

                <Card>
                    <div className="font-bold heading-text">Teléfonos</div>
                    {data.scholar_phone_numbers && data.scholar_phone_numbers.length > 0 ? (
                        data.scholar_phone_numbers.map((phone, index) => (
                            <div
                                key={index}
                                className={`mt-4 flex flex-col gap-1 ${index < data.scholar_phone_numbers.length - 1 ? 'border-b-2 border-gray-200 pb-4' : ''}`}
                            >
                                {phone.is_current && (
                                    <BooleanDetail
                                        label="Teléfono principal"
                                        value={phone.is_current}
                                    />
                                )}
                                <Detail label="Número" value={phone.number} />
                            </div>
                        ))
                    ) : (
                        <div className="mt-4">
                            <Detail label="Sin teléfonos registrados" value="" />
                        </div>
                    )}
                </Card>
                <Card>
                    <div className="font-bold heading-text">
                        Cuenta bancaria
                    </div>
                    <div className="mt-4 flex flex-col gap-1">
                        {data.bank_account ? (
                            <>
                                <Detail
                                    label="Número de cuenta"
                                    value={data.bank_account.account_number}
                                />
                                <Detail
                                    label="Titular de la cuenta"
                                    value={data.bank_account.account_holder}
                                />
                                <Detail
                                    label="Tipo de cuenta"
                                    value={
                                        BankLabels[data.bank_account.account_type] ||
                                        data.bank_account.account_type
                                    }
                                />
                                <Detail label="Banco" value={data.bank_account.bank.name} />
                            </>
                        ) : (
                            <Detail label="Sin cuenta bancaria registrada" value="" />
                        )}
                    </div>
                </Card>
            </div>
        </>
    )
}

export default DetailsSection
