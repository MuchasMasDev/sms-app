import { Drawer } from '@/components/ui'
import Button from '@/components/ui/Button'
import { useBanks } from '@/modules/catalogs'
import { useState } from 'react'
import { CSVLink } from 'react-csv'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import BankForm, { bankFormSchemaType } from './BankForm'
import { apiCreateCatalogItem, Bank, Catalog } from '@/services/CatalogService'
import { toast } from 'sonner'

const BanksActionTools = ({ onUpdate }: { onUpdate?: () => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { items } = useBanks()

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const onSubmit = async (data: bankFormSchemaType) => {

        const formData = new FormData()
        if (data.name)
            formData.append('name', data.name)
        if (data.file && data.file.length > 0)
            formData.append('file', data.file[0])

        try {
            await apiCreateCatalogItem<Bank, Bank>(
                Catalog.Banks,
                formData
            );

            toast.success('Banco creado correctamente')
            setIsOpen(false)
            onUpdate && onUpdate()

        } catch (error) {
            toast.error('Error creando banco')
            console.error('Error creating bank:', error);
        }

    }

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename={`SGB_bancos_${new Date().toISOString().split('T')[0]}.xlsx`}
                data={items}
                headers={[
                    { label: 'ID', key: 'id' },
                    { label: 'Nombre', key: 'name' },
                    { label: 'URL del logo', key: 'logo_src' },
                ]}
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
                title="Editar banco"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <BankForm
                    onSubmit={onSubmit}
                />
            </Drawer>
        </div>
    )
}

export default BanksActionTools
