import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useAllScholarsStore } from '@/modules/scholars/store/allScholarsStore'
import { apiGetAllScholarsList } from '@/services/ScholarsService'
import { Scholar } from '@/@types/scholars'

export default function useAllScholars() {
    const { tableData, filterData, setTableData, setFilterData } =
        useAllScholarsStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/scholars/all', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetAllScholarsList<
                { data: Scholar[]; total: number },
                TableQueries
            >(params),
        {
            revalidateOnFocus: false,
        },
    )

    const scholarList = data?.data || []

    const scholarListTotal = data?.total || 0

    return {
        scholarList,
        scholarListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        setFilterData,
    }
}
