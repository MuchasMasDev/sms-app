// import useSWR from 'swr'

import Loading from '@/components/shared/Loading'

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
                <div className="grid place-items-center h-full">
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div className="flex flex-col gap-4 flex-1">
                            {/* <SystemOverview data={data.system} /> */}
                            <img
                                className="w-1/2 h-full object-cover mx-auto rounded-lg shadow-lg"
                                src="/img/blank_state.png"
                                alt="Home_Image"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-center text-slate-700 mt-4">
                            ¡Bienvenida a la plataforma de Muchas Más!
                        </h2>
                    </div>
                    {/* SOME MORE DATA HERE */}
                </div>
            )}
        </Loading>
    )
}

export default Home
