import type { TableQueries } from '@/@types/common'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import { Drawer } from '@/components/ui'
import Tooltip from '@/components/ui/Tooltip'
import { useBanks } from '@/modules/catalogs'
import { apiDeleteCatalogItem, apiUpdateCatalogItem, Bank, Catalog } from '@/services/CatalogService'
import cloneDeep from 'lodash/cloneDeep'
import { useMemo, useState, MouseEvent as ReactMouseEvent, useCallback } from 'react'
import { TbPencil, TbTrash } from 'react-icons/tb'
import BankForm, { bankFormSchemaType } from './BankForm'
import { ConfirmDialog } from '@/components/shared'
import { toast } from 'sonner'

const ActionColumn = ({ row, onUpdate }: { row: Bank, onUpdate?: () => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [confirmationOpen, setConfirmationOpen] = useState(false)


    const onSubmit = async (data: bankFormSchemaType) => {
        const formData = new FormData()
        if (data.name)
            formData.append('name', data.name)
        if (data.file && data.file.length > 0)
            formData.append('file', data.file[0])

        try {
            await apiUpdateCatalogItem<Bank, Bank>(
                Catalog.Banks,
                row.id,
                formData
            );

            toast.success('Banco actualizado correctamente')
            setIsOpen(false)
            onUpdate && onUpdate()

        } catch (error) {
            console.error('Error updating bank:', error);
        }
    }

    const onDelete = async () => {
        try {
            toast.loading('Eliminando banco...', { id: 'delete-bank' })
            await apiDeleteCatalogItem<{ success: boolean }>(
                Catalog.Banks,
                row.id
            );
            toast.success('Banco eliminado correctamente', { id: 'delete-bank' })
            setConfirmationOpen(false)
            onUpdate && onUpdate()

        } catch (error) {
            toast.error('Error eliminando banco', { id: 'delete-bank' })
            console.error('Error deleting bank:', error);
        } finally {
            setTimeout(() => {
                toast.dismiss('delete-bank')
            }, 2000)
            setConfirmationOpen(false)
        }
    }

    const onEdit = () => {
        setIsOpen(true)

    }

    const onDrawerClose = (e: ReactMouseEvent<HTMLSpanElement, MouseEvent>) => {
        console.log('onDrawerClose', e)
        setIsOpen(false)
    }

    return (
        <div className="flex justify-end text-lg gap-1">

            <Tooltip wrapperClass="flex" title="Eliminar banco">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={() => setConfirmationOpen(true)}
                >
                    <TbTrash />
                </span>
            </Tooltip>
            <Tooltip wrapperClass="flex" title="Editar banco">
                <span
                    className="cursor-pointer p-2 hover:text-blue-500"
                    onClick={onEdit}
                >
                    <TbPencil />
                </span>
            </Tooltip>

            <Drawer
                title="Editar banco"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <BankForm
                    defaultValues={row}
                    onSubmit={onSubmit}
                />
            </Drawer>

            <ConfirmDialog
                isOpen={confirmationOpen}
                type="danger"
                title="Eliminar banco"
                className={'max-w-sm'}
                onConfirm={onDelete}
                onClose={() => setConfirmationOpen(false)}
                onRequestClose={() => setConfirmationOpen(false)}
                onCancel={() => setConfirmationOpen(false)}
            >
                <p>
                    ¿Estás seguro de que deseas eliminar el banco{' '}
                    <strong>{row.name}</strong>? Esta acción no se puede deshacer.
                    <br />
                </p>
            </ConfirmDialog>
        </div>
    )
}

const BanksTable = () => {
    const { items, totalItems, tableData, isLoading, setTableData, mutate } = useBanks()

    const handleRefresh = useCallback(() => {
        mutate()
    }, [mutate])

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
                cell: (props) => <ActionColumn row={props.row.original} onUpdate={handleRefresh} />,
            },
        ],
        [handleRefresh],
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
