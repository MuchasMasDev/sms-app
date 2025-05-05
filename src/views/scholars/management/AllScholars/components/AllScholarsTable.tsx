import type { TableQueries } from '@/@types/common'
import { Scholar, ScholarState } from '@/@types/scholars'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import useAllScholars from '@/modules/scholars/hooks/useAllScholars'
import cloneDeep from 'lodash/cloneDeep'
import { useMemo } from 'react'
import { TbEye } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

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
                header: 'Email',
                accessorKey: 'user.email',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.user.email}
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
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default AllScholarsTable
