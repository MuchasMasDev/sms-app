import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'
import { TbEye, TbPencil } from 'react-icons/tb'
import type { TableQueries } from '@/@types/common'
import { Scholar, ScholarState } from '@/@types/scholars'
import useAllScholars from '@/modules/scholars/hooks/useAllScholars'

const stateColor: Record<
    ScholarState,
    {
        label: string
        bgClass: string
        textClass: string
    }
> = {
    ACTIVE: {
        label: 'Activa',
        bgClass: 'bg-success-subtle',
        textClass: 'text-success',
    },
    INACTIVE: {
        label: 'Inactiva',
        bgClass: 'bg-warning-subtle',
        textClass: 'text-warning',
    },
    GRADUATED: {
        label: 'Graduada',
        bgClass: 'bg-primary-subtle',
        textClass: 'text-primary',
    },
}

const RefCodeColumn = ({ row }: { row: Scholar }) => {
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/scholars/details/${row.id}`)
    }

    return (
        <span
            className="cursor-pointer font-bold heading-text hover:text-primary"
            onClick={onView}
        >
            {row.user.ref_code}
        </span>
    )
}

const ActionColumn = ({ row }: { row: Scholar }) => {
    const navigate = useNavigate()

    const onEdit = () => {}

    const onView = () => {
        navigate(`/scholars/details/${row.id}`)
    }

    return (
        <div className="flex justify-end text-lg gap-1">
            <Tooltip wrapperClass="flex" title="View">
                <span className={`cursor-pointer p-2`} onClick={onView}>
                    <TbEye />
                </span>
            </Tooltip>
            <Tooltip wrapperClass="flex" title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onEdit}
                >
                    <TbPencil />
                </span>
            </Tooltip>
        </div>
    )
}

const AllScholarsTable = () => {
    const { scholarList, scholarListTotal, tableData, isLoading, setTableData } =
        useAllScholars()

    const columns: ColumnDef<Scholar>[] = useMemo(
        () => [
            {
                header: 'Código',
                accessorKey: 'user.ref_code',
                cell: (props) => <RefCodeColumn row={props.row.original} />,
            },
            {
                header: 'Nombres',
                accessorKey: 'user.first_name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.user.first_name}
                        </span>
                    )
                },
            },
            {
                header: 'Apellidos',
                accessorKey: 'user.last_name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.user.last_name}
                        </span>
                    )
                },
            },
            {
                header: 'Estado',
                accessorKey: 'state',
                cell: (props) => {
                    const { state } = props.row.original
                    return (
                        <Tag className={stateColor[state].bgClass}>
                            <span
                                className={`capitalize font-semibold ${stateColor[state].textClass}`}
                            >
                                {stateColor[state].label}
                            </span>
                        </Tag>
                    )
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
            data={scholarList}
            noData={!isLoading && scholarList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: scholarListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={handlePaginationChange}
            onSort={handleSort}
        />
    )
}

export default AllScholarsTable
