import { AdaptiveCard, Container } from '@/components/shared'
import AllScholarsTable from '@/views/scholars/management/AllScholars/components/AllScholarsTable'
import AllScholarsActionTools from '@/views/scholars/management/AllScholars/components/AllScholarsActionTools'

const AllScholars = () => {
    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Registros de becarias en el sistema</h3>
                        <AllScholarsActionTools />
                    </div>
                    {/*<AllScholarsTableTools />*/}
                    <AllScholarsTable />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default AllScholars
