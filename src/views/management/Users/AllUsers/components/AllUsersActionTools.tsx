import { Drawer } from '@/components/ui'
import Button from '@/components/ui/Button'
import useAllUsers from '@/modules/users/hooks/useAllScholars'
import { apiSignUp } from '@/services/AuthService'
import { useState } from 'react'
import { CSVLink } from 'react-csv'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { toast } from 'sonner'
import UserForm, { userFormSchemaType } from './UserForm'

const AllUsersActionTools = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { userList, mutate } = useAllUsers()

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const onSubmit = async (data: userFormSchemaType) => {

        try {
            await apiSignUp({
                ...data,
                role: data.roles[0],
                password: data.password!,
            })

            toast.success('Usuaria creado correctamente')
            setIsOpen(false)
            mutate()

        } catch (error) {
            toast.error('Error creando usuaria')
            console.error('Error creating bank:', error);
        }

    }

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename={`reporte_usuarios_${new Date().toISOString().split('T')[0]}.xlsx`}
                data={userList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Descargar datos
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() => setIsOpen(true)}
            >
                Agregar nuevo registro
            </Button>

            <Drawer
                title="Crear nuevo usuaria"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <UserForm
                    onSubmit={onSubmit}
                />
            </Drawer>
        </div>
    )
}

export default AllUsersActionTools
