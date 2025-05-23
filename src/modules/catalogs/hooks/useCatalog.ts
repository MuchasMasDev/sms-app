import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { apiGetCatalog, Catalog } from '@/services/CatalogService'

export default function useCatalog<T>(
    catalog: Catalog,
    useStore: () => {
        tableData: TableQueries;
        items: T[];
        setTableData: (data: TableQueries) => void;
        setItems: (items: T[]) => void;
    }
) {
    const { tableData, setTableData, items, setItems } = useStore()

    const { data, error, isLoading, mutate } = useSWR(
        [`/api/${catalog}`, tableData],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetCatalog<T[], TableQueries>(params, catalog),
        {
            revalidateOnFocus: false,
            onSuccess: (data) => {
                console.log({ data });

                if (data) {
                    setItems(data);
                }
            }
        },
    )

    const totalItems = data?.length || 0

    return {
        items,
        totalItems,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
    }
}