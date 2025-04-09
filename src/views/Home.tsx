// import useSWR from 'swr'

import Loading from '@/components/shared/Loading'
import SystemOverview from '@/components/home/SystemOverview'

const Home = () => {
    // const { data, isLoading } = useSWR(
    //     ['/api/dashboard/project'],
    //     () => apiGetSystemStatus<{ stuff: 354 }>(),
    //     {
    //         revalidateOnFocus: false,
    //         revalidateIfStale: false,
    //         revalidateOnReconnect: false,
    //     },
    // )

    const isLoading = false
    const data = {
        system: {
            stuff: 24,
        },
    }

    return (
        <Loading loading={isLoading}>
            {data && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div className="flex flex-col gap-4 flex-1">
                            <SystemOverview data={data.system} />
                        </div>
                    </div>
                    {/* SOME MORE DATA HERE */}
                </div>
            )}
        </Loading>
    )
}

export default Home
