import { Drawer } from '@/components/ui'
import Button from '@/components/ui/Button'
import useAllUsers from '@/modules/users/hooks/useAllScholars'
import { apiSignUp } from '@/services/AuthService'
import { apiGenerateUsersReport } from '@/services/ReportService'
import XSLXService from '@/services/app/workbook.service'
import { useState } from 'react'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { toast } from 'sonner'
import UserForm, { userFormSchemaType } from './UserForm'

const AllUsersActionTools = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { mutate } = useAllUsers()
    const [loading, setLoading] = useState<boolean>(false)
    const xslx = new XSLXService();

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const onSubmit = async (data: userFormSchemaType) => {

        try {
            await apiSignUp({
                ...data,
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
            <Button
                icon={<TbCloudDownload className="text-xl" />}
                className="w-full"
                loading={loading}
                onClick={async () => {
                    setLoading(true)
                    try {
                        const res = await apiGenerateUsersReport<Array<{ Apellidos: string, Nombres: string, 'Rol(es)': string }>, Record<string, unknown>>({})
                        if (res) {
                            const fileName = `reporte_usuarios_${new Date().toISOString()}.xlsx`
                            xslx.exportToExcel('Sheet1', res, fileName)
                        } else {
                            console.error('Error generating report', res);
                        }
                    } catch (error) {
                        console.error('Error generating report', error);
                    } finally {
                        setLoading(false)
                    }
                }}
            >
                Descargar datos
            </Button>
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() => setIsOpen(true)}
            >
                Agregar nuevo registro
            </Button>

            <Drawer
                title="Crear nueva usuaria"
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
