import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import { User } from '@/@types/auth'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type UserListState = {
    tableData: TableQueries
    allUsers: User[]
}

type UserListAction = {
    setTableData: (payload: TableQueries) => void
}

const initialState: UserListState = {
    tableData: initialTableData,
    allUsers: [],
}

export const useAllUsersStore = create<UserListState & UserListAction>(
    (set) => ({
        ...initialState,
        setTableData: (payload) => set(() => ({ tableData: payload })),
    }),
)
