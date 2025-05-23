import Button from '@/components/ui/Button'
import XSLXService from '@/services/app/workbook.service'
import { apiGenerateScholarReport } from '@/services/ReportService'
import { useState } from 'react'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

type FormattedScholar = {
    Apellidos: string,
    Nombres: string,
    'Rol(es)': string
}

const AllScholarsActionTools = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const xlsxService = new XSLXService();

    return (
        <div className="flex flex-col md:flex-row gap-3">

            <Button
                icon={<TbCloudDownload className="text-xl" />}
                className="w-full"
                loading={loading}
                onClick={async () => {
                    setLoading(true)
                    try {
                        const res = await apiGenerateScholarReport<Array<FormattedScholar>, Record<string, unknown>>({})
                        console.log('res', res);
                        
                        if (res) {
                            const fileName = `reporte_becarias_${new Date().toISOString()}.xlsx`
                            await xlsxService.createSheet('Sheet1', res)
                            await xlsxService.saveToFile(fileName)
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
                onClick={() => navigate('/scholars/new')}
            >
                Agregar nuevo registro
            </Button>
        </div>
    )
}

export default AllScholarsActionTools
