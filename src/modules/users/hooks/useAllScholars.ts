import { User } from '@/@types/auth'
import type { TableQueries } from '@/@types/common'
import { useAllUsersStore } from '@/modules/users/store/allUsersStore'
import { apiGetAllUsers } from '@/services/UserService'
import useSWR from 'swr'

export default function useAllUsers() {
    const { tableData, setTableData } =
        useAllUsersStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/users/all', { ...tableData }],
        ([, params]) =>
            apiGetAllUsers<
                { data: User[]; total: number },
                TableQueries
            >(params),
        {
            revalidateOnFocus: false,
        },
    )

    const userList = data?.data || []

    const userListTotal = data?.total || 0

    return {
        userList,
        userListTotal,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
    }
}
