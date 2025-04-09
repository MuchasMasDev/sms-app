import Card from '@/components/ui/Card'
import classNames from '@/utils/classNames'
import { TbArrowDownToArc, TbCopyCheck, TbProgressBolt } from 'react-icons/tb'
import type { ReactNode } from 'react'

type StatisticCardProps = {
    title: string
    icon: ReactNode
    className: string
    textColor: string
    iconBgColor: string
    value: number
}

type SystemOverviewData = {
    data: {
        stuff: number
    }
}

const StatisticCard = ({
    title,
    className,
    textColor,
    iconBgColor,
    icon,
    value,
}: StatisticCardProps) => {
    return (
        <div
            className={classNames(
                'rounded-2xl p-4 flex flex-col justify-center ',
                className,
            )}
        >
            <div className="flex justify-between items-center relative">
                <div>
                    <div className={classNames('mb-4 font-bold', textColor)}>
                        {title}
                    </div>
                    <h1 className={classNames('mb-1', textColor)}>{value}</h1>
                </div>
                <div
                    className={classNames(
                        iconBgColor,
                        'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 rounded-full text-2xl text-white',
                    )}
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}

const SystemOverview = ({ data }: SystemOverviewData) => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Estadísticas del sistema</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl mt-4">
                <StatisticCard
                    title="Becarias Activas"
                    textColor="text-emerald-950 dark:text-emerald-600"
                    iconBgColor="bg-emerald-800 dark:bg-emerald-700"
                    className="bg-emerald-200 dark:bg-opacity-50"
                    // value={data.ongoingProject}
                    value={data.stuff}
                    icon={<TbProgressBolt />}
                />
                <StatisticCard
                    title="Presupuestos pendientes"
                    textColor="text-sky-950 dark:text-sky-600"
                    iconBgColor="bg-sky-800 dark:bg-sky-700"
                    className="bg-sky-200 dark:bg-opacity-50"
                    // value={data.projectCompleted}
                    value={125}
                    icon={<TbCopyCheck />}
                />
                <StatisticCard
                    title="Solicitudes pendientes"
                    textColor="text-indigo-950 dark:text-indigo-500"
                    iconBgColor="bg-indigo-800 dark:bg-indigo-700"
                    className="bg-indigo-200 dark:bg-opacity-50"
                    // value={data.upcomingProject}
                    value={84}
                    icon={<TbArrowDownToArc />}
                />
            </div>
        </Card>
    )
}

export default SystemOverview
