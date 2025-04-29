import { Authorities, User } from '@/@types/auth'
import type { TableQueries } from '@/@types/common'
import { ConfirmDialog } from '@/components/shared'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import { Drawer, Tag } from '@/components/ui'
import Tooltip from '@/components/ui/Tooltip'
import useAllUsers from '@/modules/users/hooks/useAllScholars'
import cloneDeep from 'lodash/cloneDeep'
import { useMemo, useState } from 'react'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { toast } from 'sonner'
import UserForm, { userFormSchemaType } from './UserForm'
import { apiUpdateUser, apiUpdateUserRoles } from '@/services/AuthService'
import { apiDeleteUser } from '@/services/UserService'

const roleColor: Record<
    Authorities,
    {
        label: string
        bgClass: string
        textClass: string
    }
> = {
    ADMIN: {
        label: 'Administradora',
        bgClass: 'bg-blue-100',
        textClass: 'text-blue-600',
    },
    ACADEMIC: {
        label: 'Academica',
        bgClass: 'bg-amber-100',
        textClass: 'text-amber-600',
    },
    FINANCE: {
        label: 'Financiera',
        bgClass: 'bg-lime-100',
        textClass: 'text-lime-600',
    },
    PSY: {
        label: 'Psicóloga',
        bgClass: 'bg-orange-100',
        textClass: 'text-orange-600',
    },
    SCHOLAR: {
        label: 'Becaria',
        bgClass: 'bg-violet-100',
        textClass: 'text-violet-600',
    },
    SPC: {
        label: 'Coordinadora de programa',
        bgClass: 'bg-teal-100',
        textClass: 'text-teal-600',
    },
    SPCA: {
        label: 'Auxiliar de coordinadora',
        bgClass: 'bg-cyan-100',
        textClass: 'text-cyan-600',
    },
    TUTOR: {
        label: 'Tutor / Tutora',
        bgClass: 'bg-green-100',
        textClass: 'text-green-600',
    },
}

const ActionColumn = ({ row, onUpdate }: { row: User, onUpdate?: () => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [confirmationOpen, setConfirmationOpen] = useState(false)


    const onSubmit = async (data: userFormSchemaType) => {

        const { roles, password, ...rest } = data
        if (password) {
            toast.error('No puedes cambiar la contraseña desde aquí')
            return
        }

        try {
            await apiUpdateUser({
                ...rest,
                id: row.id!,
            });
            await apiUpdateUserRoles(roles, row.id!)

            toast.success('Usuaria actualizada correctamente')
            setIsOpen(false)
            onUpdate && onUpdate()

        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    const onDelete = async () => {
        try {
            toast.loading('Eliminando usuaria...', { id: 'delete-user' })
            await apiDeleteUser(row.id!);
            toast.success('Usuaria eliminada correctamente', { id: 'delete-user' })
            setConfirmationOpen(false)
            onUpdate && onUpdate()

        } catch (error) {
            toast.error('Error eliminando usuaria', { id: 'delete-user' })
            console.error('Error deleting user:', error);
        } finally {
            setTimeout(() => {
                toast.dismiss('delete-user')
            }, 2000)
            setConfirmationOpen(false)
        }
    }

    const onEdit = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="flex justify-end text-lg gap-1">

            <Tooltip wrapperClass="flex" title="Eliminar usuaria">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={() => setConfirmationOpen(true)}
                >
                    <TbTrash />
                </span>
            </Tooltip>
            <Tooltip wrapperClass="flex" title="Editar usuaria">
                <span
                    className="cursor-pointer p-2 hover:text-blue-500"
                    onClick={onEdit}
                >
                    <TbPencil />
                </span>
            </Tooltip>

            <Drawer
                title="Editar usuaria"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <UserForm
                    defaultValues={row}
                    onSubmit={onSubmit}
                />
            </Drawer>

            <ConfirmDialog
                isOpen={confirmationOpen}
                type="danger"
                title="Eliminar usuaria del sistema"
                className={'max-w-sm'}
                onConfirm={onDelete}
                onClose={() => setConfirmationOpen(false)}
                onRequestClose={() => setConfirmationOpen(false)}
                onCancel={() => setConfirmationOpen(false)}
            >
                <p>
                    ¿Estás seguro de que deseas eliminar la usuaria de {' '}
                    <strong>{row.first_name} {row.last_name}</strong>?
                    <br />
                    Esta acción no se puede deshacer y la usuaria no podrá acceder al sistema.
                </p>
            </ConfirmDialog>
        </div>
    )
}

const AllUsersTable = () => {
    const {
        userList,
        userListTotal,
        tableData,
        isLoading,
        setTableData,
        mutate,
    } = useAllUsers()

    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: 'Código',
                accessorKey: 'ref_code',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">{row.ref_code}</span>
                    )
                },
            },
            {
                header: 'Nombres',
                accessorKey: 'first_name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.first_name}
                        </span>
                    )
                },
            },
            {
                header: 'Apellidos',
                accessorKey: 'last_name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.last_name}
                        </span>
                    )
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">{row.email}</span>
                    )
                },
            },
            {
                header: 'Roles',
                accessorKey: 'roles',
                cell: (props) => {
                    const { roles } = props.row.original
                    return (
                        <div className="flex gap-2">
                            {roles!.map((role, index) => (
                                <Tag key={index} className={roleColor[role].bgClass}>
                                    <span
                                        className={`capitalize font-semibold ${roleColor[role].textClass}`}
                                    >
                                        {roleColor[role].label}
                                    </span>
                                </Tag>
                            ))}
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn
                    row={props.row.original}
                    onUpdate={() => { mutate() }}
                />,
            },
        ],
        [mutate],
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
            data={userList}
            noData={!isLoading && userList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: userListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default AllUsersTable
