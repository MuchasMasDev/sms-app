import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import { Scholar, ScholarState } from '@/@types/scholars'

export type Filter = {
    status: ScholarState | 'all'
}

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData: Filter = {
    status: 'all',
}

export type OrderListState = {
    tableData: TableQueries
    filterData: Filter
    allScholars: Scholar[]
}

type OrderListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
}

const initialState: OrderListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    allScholars: [],
}

export const useAllScholarsStore = create<OrderListState & OrderListAction>(
    (set) => ({
        ...initialState,
        setFilterData: (payload) => set(() => ({ filterData: payload })),
        setTableData: (payload) => set(() => ({ tableData: payload })),
    }),
)
