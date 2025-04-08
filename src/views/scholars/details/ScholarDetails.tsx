import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import ProfileSection from './ProfileSection'
import BillingSection from './DetailsSection'
import ActivitySection from './ActivitySection'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetScholar } from '@/services/ScholarService'
import { UserScholarDetails } from '@/@types/scholar'

const { TabNav, TabList, TabContent } = Tabs

const ScholarDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        id ? `/api/scholars/${id}` : null,
        () =>
            apiGetScholar<UserScholarDetails, { id: string }>({
                id: id as string,
            }),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnMount: true,
        },
    )

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <ProfileSection data={data} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="billing">
                            <TabList>
                                <TabNav value="detalles">Detalles</TabNav>
                                <TabNav value="activity">Notas</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="detalles">
                                    <BillingSection data={data} />
                                </TabContent>
                                <TabContent value="activity">
                                    <ActivitySection
                                        customerName={data.user.first_name}
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
