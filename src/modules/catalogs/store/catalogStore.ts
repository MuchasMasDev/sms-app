import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type CatalogListState<T> = {
    tableData: TableQueries
    items: T[]
}

type CatalogListAction<T> = {
    setTableData: (payload: TableQueries) => void
    setItems: (items: T[]) => void
}

export const createCatalogStore = <T>() => {
    const initialState: CatalogListState<T> = {
        tableData: initialTableData,
        items: [],
    }

    return create<CatalogListState<T> & CatalogListAction<T>>((set) => ({
        ...initialState,
        setTableData: (payload) => set(() => ({ tableData: payload })),
        setItems: (items) => set(() => ({ items })),
    }))
}