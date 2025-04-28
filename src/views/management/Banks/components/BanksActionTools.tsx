import Button from '@/components/ui/Button'
import { useBanks } from '@/modules/catalogs'
import { CSVLink } from 'react-csv'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const BanksActionTools = () => {
    const navigate = useNavigate()

    const { items } = useBanks()

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
                onClick={() => navigate('/bank/new')}
            >
                Agregar nuevo registro
            </Button>
        </div>
    )
}

export default BanksActionTools
