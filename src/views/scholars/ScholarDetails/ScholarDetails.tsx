import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import ProfileSection from './ProfileSection'
import ActivitySection from './ActivitySection'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetScholar } from '@/services/ScholarService'
import { UserScholarDetails } from '@/@types/scholar'
import DetailsSection from '@/views/scholars/ScholarDetails/DetailsSection'
import { AuthorityCheck } from '@/components/shared'
import { useAuth } from '@/auth'

const { TabNav, TabList, TabContent } = Tabs

const ScholarDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()

    const { data, isLoading } = useSWR(id ? `/api/scholars/${id}` : null, () =>
        apiGetScholar<UserScholarDetails, { id: string }>({
            id: id as string,
        }),
    )

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <ProfileSection data={data} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="detalles">
                            <TabList>
                                <TabNav value="detalles">Detalles</TabNav>
                                <AuthorityCheck
                                    authority={['ADMIN']}
                                    userAuthority={user.roles}
                                >
                                    <TabNav value="activity">Notas</TabNav>
                                </AuthorityCheck>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="detalles">
                                    <DetailsSection data={data} />
                                </TabContent>
                                <TabContent value="activity">
                                    <ActivitySection
                                        scholarName={data.user.first_name}
                                        id={id as string}
                                    />
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default ScholarDetails
