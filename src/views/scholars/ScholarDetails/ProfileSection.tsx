import { UserScholarDetails } from '@/@types/scholar'
import { useAuth } from '@/auth'
import { AuthorityCheck } from '@/components/shared'
import Avatar from '@/components/ui/Avatar/Avatar'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Tooltip from '@/components/ui/Tooltip'
import CreateScholarLog from '@/views/scholars/ScholarDetails/CreateScholarLog'
import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

type CustomerInfoFieldProps = {
    title?: string
    value?: string
}

type ProfileSectionProps = {
    data: UserScholarDetails
}

const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
        <div className='flex gap-4 flex-row items-center'>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--
    }

    return age
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth()

    const handleOpenDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const handleEdit = () => {
        navigate(`/scholars/edit/${data.id}`)
    }

    return (
        <Card className="w-full">
            <div className="flex justify-end">
                <Tooltip title="Editar becaria">
                    <button
                        className="close-button button-press-feedback"
                        type="button"
                        onClick={handleEdit}
                    >
                        <HiPencil />
                    </button>
                </Tooltip>
            </div>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <Avatar
                        size={90}
                        shape="circle"
                        src={
                            'https://images.unsplash.com/photo-1592188657297-c6473609e988?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                    />
                    <div className="flex flex-col items-center">
                        <h4 className="font-bold">{data.user.first_name}</h4>
                        <h4 className="font-bold">{data.user.last_name}</h4>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 my-10">
                    <CustomerInfoField
                        title="Edad"
                        value={`${calculateAge(data.dob)} años`}
                    />
                    <CustomerInfoField
                        title="Código"
                        value={data.user.ref_code}
                    />
                    <CustomerInfoField title="Email" value={data.user.email} />
                    <CustomerInfoField
                        title="Celular de contacto"
                        value={data.emergency_contact_phone}
                    />
                    <CustomerInfoField
                        title="Fecha de nacimiento"
                        value={new Date(data.dob).toLocaleDateString()}
                    />
                </div>
                <AuthorityCheck
                    authority={['ADMIN']}
                    userAuthority={user.roles}
                >
                    <div className="flex flex-col gap-4">
                        <Button block variant="solid" onClick={handleOpenDrawer}>
                            Crear bitácora
                        </Button>
                    </div>
                    <CreateScholarLog
                        scholarId={data.id}
                        isOpen={isOpen}
                        onDrawerClose={onDrawerClose}
                    />
                </AuthorityCheck>
            </div>
        </Card>
    )
}

export default ProfileSection
