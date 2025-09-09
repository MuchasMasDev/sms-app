import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import useSWR from 'swr'
import { useNavigate, useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetScholar } from '@/services/ScholarService'
import DetailsSection from '@/views/scholars/ScholarDetails/DetailsSection'
import { AuthorityCheck } from '@/components/shared'
import { useAuth } from '@/auth'
import { ScholarDetails as ScholarDType } from '@/@types/scholar'
import ProfileMenu from './ProfileMenu'
import Tooltip from '@/components/ui/Tooltip'
import Avatar from '@/components/ui/Avatar/Avatar'
import {
  HiPencil, 
  HiOutlineUsers
} from 'react-icons/hi'
import {
    PiUserList,
    PiNotebook,
    PiGraduationCap,
    PiFiles,
    PiClipboardText,
} from 'react-icons/pi'

const { TabNav, TabList, TabContent } = Tabs

const ScholarDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()

    const { data, isLoading } = useSWR(id ? `/api/scholars/${id}` : null, () =>
        apiGetScholar<ScholarDType, { id: string }>({
            id: id as string,
        }),
    )

    const handleEdit = () => {
        if(data) return navigate(`/scholars/edit/${data.id}`)
        
    }    

    const items=[
        { value: 'detalles',   label: 'Detalles de perfil',     icon: <PiUserList/>},
        { value: 'bitacora',   label: 'Bitácora',               icon: <PiNotebook /> },
        { value: 'academico',  label: 'Registro académico',     icon: <PiGraduationCap /> },
        { value: 'refuerzos',  label: 'Refuerzos académicos',   icon: <PiFiles /> },
        { value: 'notas',      label: 'Notas académicas',       icon: <PiClipboardText /> },
        { value: 'externos',   label: 'Refuerzos externos',     icon: <HiOutlineUsers /> },
    ]

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <Tabs defaultValue='detalles'>
                    <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[230px] 2xl:min-w-[250px]">
                        <ProfileMenu items={ items }/>
                    </div>
                    <Card className="w-full">
                        <div className='flex items-start justify-between gap-3 p-4'>
                            <div className='flex flex-col w-full'>
                                <div className='flex flex-row justify-between'>
                                    <h2 className='text-lg font-bold leading-tight'>
                                        {data.user.first_name} {data.user.last_name}
                                    </h2>
                                    <AuthorityCheck authority={['ADMIN']} userAuthority={user.roles}>
                                        <Tooltip title="Editar detalles">
                                            <button
                                            className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-4 py-4
                                            text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 
                                            focus-visible:ring-offset-0 focus-visible:ring-gray-300 disabled:opacity-50"
                                            type="button"
                                            onClick={handleEdit}
                                            >
                                                <HiPencil className='self-center'/>
                                                <span>Editar detalles</span>
                                            </button>
                                        </Tooltip>
                                    </AuthorityCheck>
                                </div>
                                <div className='flex flex-col w-full justify-center items-center gap-3'>
                                    <Avatar
                                        size={90}
                                        shape="circle"
                                        src={data.user.profile_img_src ?? 'https://images.unsplash.com/photo-1592188657297-c6473609e988?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                    />
                                    <h3 className='text-lg font-bold leading-tight'>
                                        {data.user.ref_code}
                                    </h3>
                                    <p className='text-xs text-gray-700 w w-full text-center'>
                                        Fecha de ingreso al programa <strong>{new Date(data.ingress_date).toLocaleDateString()}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <TabContent value='detalles'>
                            <DetailsSection data={data}/>
                        </TabContent>
                        <TabContent value='bitacora'>
                            <div className="text-sm text-gray-600">Bitácora…</div>
                        </TabContent>
                        <TabContent value='academico'>
                            <div className="text-sm text-gray-600">Registro académico…</div>
                        </TabContent>
                        <TabContent value='refuerzos'>
                            <div className="text-sm text-gray-600">Refuerzos académico…</div>
                        </TabContent>
                        <TabContent value='notas'>
                            <div className="text-sm text-gray-600">Notas acdémicas…</div>
                        </TabContent>
                        <TabContent value='externos'>
                            <div className="text-sm text-gray-600">Refuerzos externos…</div>
                        </TabContent>
                    </Card>
                </div>
            </Tabs>
            )}
        </Loading>
    )
}

export default ScholarDetails
