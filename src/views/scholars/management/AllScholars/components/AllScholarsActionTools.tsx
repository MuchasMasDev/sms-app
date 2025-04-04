import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import useAllScholars from '@/modules/scholars/hooks/useAllScholars'

const AllScholarsActionTools = () => {
    const navigate = useNavigate()

    const { scholarList } = useAllScholars()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename={`reporte_becarias_${new Date().toISOString().split('T')[0]}.xlsx`}
                data={scholarList}
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
                onClick={() => navigate('/scholars/add-new')}
            >
                Agregar nuevo registro
            </Button>
        </div>
    )
}

export default AllScholarsActionTools
