import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'
import { TbPencil } from 'react-icons/tb'
import type { TableQueries } from '@/@types/common'
import { useBanks } from '@/modules/catalogs'
import { Bank } from '@/services/CatalogService'

const ActionColumn = ({ row }: { row: Bank }) => {
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/catalogs/banks/${row.id}`)
    }

    return (
        <div className="flex justify-end text-lg gap-1">
            <Tooltip wrapperClass="flex" title="Editar banco">
                <span
                    className="cursor-pointer p-2 hover:text-blue-500"
                    onClick={onEdit}
                >
                    <TbPencil />
                </span>
            </Tooltip>
        </div>
    )
}

const BanksTable = () => {
    const { items, totalItems, tableData, isLoading, setTableData } = useBanks()

    const columns: ColumnDef<Bank>[] = useMemo(
        () => [
            {
                header: 'Imagen en sistema',
                accessorKey: 'logo_src',
                cell: (props) => {
                    const { logo_src, name } = props.row.original
                    return (
                        <div>
                            <img
                                className="h-12 rounded object-cover drop-shadow border border-gray-200 ring-offset-2 ring-gray-200"
                                src={logo_src}
                                alt={name}
                            />
                        </div>
                    )
                },
            },
            {
                header: 'Nombre',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="font-semibold">{row.name}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    return (
        <DataTable
            columns={columns}
            data={items}
            noData={!isLoading && items.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: totalItems,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default BanksTable
