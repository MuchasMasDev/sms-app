import { User } from '@/@types/auth'
import Loading from '@/components/shared/Loading'
import Card from '@/components/ui/Card'
import { apiGetScholarLogBook } from '@/services/ScholarService'
import dayjs from 'dayjs'
import isEmpty from 'lodash/isEmpty'
import useSWR from 'swr'

// Define the structure of a single log entry
type LogEntry = {
    id: number
    scholar_id: string
    date: string
    log: string
    created_at: string
    created_by: string
    users: User
}

// Define the API response type (array of log entries)
type Logs = LogEntry[]

// Component to display the content of a log entry
const LogContent = ({ log, users }: LogEntry) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <span className="font-bold">
                    {users.first_name} {users.last_name}
                </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{log}</p>
        </div>
    )
}

const ActivitySection = ({
    scholarName,
    id,
}: {
    scholarName: string
    id: string
}) => {
    const { data, isLoading } = useSWR(
        [`/logbook/scholar/${id}`, { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetScholarLogBook<Logs, { id: string }>(params),
    )

    // Group logs by date (YYYY-MM-DD)
    const groupedLogs =
        data?.reduce(
            (acc, log) => {
                const dateKey = dayjs(log.date).format('YYYY-MM-DD')
                if (!acc[dateKey]) {
                    acc[dateKey] = []
                }
                acc[dateKey].push(log)
                return acc
            },
            {} as Record<string, LogEntry[]>,
        ) || {}

    return (
        <Loading loading={isLoading}>
            {isEmpty(data) ? (
                <Card>
                    <div className="flex justify-center items-center p-8">
                        <p className="text-gray-500">
                            No hay entradas en la bitácora de {scholarName}
                        </p>
                    </div>
                </Card>
            ) : (
                Object.entries(groupedLogs).map(([dateKey, logs]) => (
                    <div key={dateKey} className="mb-6">
                        <div className="mb-4 font-bold uppercase flex items-center gap-4">
                            <span className="w-[120px] heading-text">
                                {dayjs(dateKey).format('DD MMMM YYYY')}
                            </span>
                            <div className="border-b border-2 border-gray-200 dark:border-gray-600 border-dashed w-full"></div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {logs.map((log) => (
                                <div
                                    key={log.id}
                                    className="flex items-start gap-3"
                                >
                                    <span className="font-semibold w-[100px] text-sm pt-2">
                                        {dayjs(log.date).format('h:mm A')}
                                    </span>
                                    <Card className="w-full" bodyClass="py-4">
                                        <div className="flex items-start gap-4">
                                            <LogContent {...log} />
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </Loading>
    )
}

export default ActivitySection
