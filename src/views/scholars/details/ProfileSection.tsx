import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar/Avatar'
import Notification from '@/components/ui/Notification'
import Tooltip from '@/components/ui/Tooltip'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import dayjs from 'dayjs'
import { HiPencil, HiOutlineTrash } from 'react-icons/hi'
import {
    FaXTwitter,
    FaFacebookF,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { UserScholarDetails } from '@/@types/scholar'

type CustomerInfoFieldProps = {
    title?: string
    value?: string
}

type ProfileSectionProps = {
    data: UserScholarDetails
}

const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
    const navigate = useNavigate()

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDelete = () => {
        setDialogOpen(false)
        navigate('/concepts/customers/customer-list')
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                Customer successfuly deleted
            </Notification>,
        )
    }

    const handleSendMessage = () => {
        navigate('/concepts/chat')
    }

    const handleEdit = () => {
        navigate(`/concepts/customers/customer-edit/${data.id}`)
    }

    return (
        <Card className="w-full">
            <div className="flex justify-end">
                <Tooltip title="Edit customer">
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
                    <h4 className="font-bold">
                        {data.user.first_name} {data.user.last_name}
                    </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                    <CustomerInfoField title="Email" value={data.user.email} />
                    <CustomerInfoField
                        title="Phone"
                        value={data.emergency_contact_phone}
                    />
                    <CustomerInfoField
                        title="Date of birth"
                        value={new Date(data.dob).toLocaleDateString()}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Button block variant="solid" onClick={handleSendMessage}>
                        Send Messsage
                    </Button>
                    <Button
                        block
                        customColorClass={() =>
                            'text-error hover:border-error hover:ring-1 ring-error hover:text-error'
                        }
                        icon={<HiOutlineTrash />}
                        onClick={handleDialogOpen}
                    >
                        Delete
                    </Button>
                </div>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="Delete customer"
                    onClose={handleDialogClose}
                    onRequestClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    onConfirm={handleDelete}
                >
                    <p>
                        Are you sure you want to delete this customer? All
                        record related to this customer will be deleted as well.
                        This action cannot be undone.
                    </p>
                </ConfirmDialog>
            </div>
        </Card>
    )
}

export default ProfileSection
