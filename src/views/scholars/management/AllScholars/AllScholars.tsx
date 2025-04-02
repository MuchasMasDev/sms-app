import { AdaptiveCard, Container } from '@/components/shared'

const AllScholars = () => {
    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Registros de becarias en el sistema</h3>
                        {/*<OrderListActionTools />*/}
                    </div>
                    {/*<OrderListTableTools />*/}
                    {/*<OrderListTable />*/}
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default AllScholars
