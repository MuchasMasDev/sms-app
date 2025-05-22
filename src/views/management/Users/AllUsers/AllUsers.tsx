import { AdaptiveCard, Container } from '@/components/shared'
import AllUsersActionTools from '@/views/management/Users/AllUsers/components/AllUsersActionTools'
import AllUsersTable from '@/views/management/Users/AllUsers/components/AllUsersTable'
import AllUsersTableTools from './components/AllUsersTableTools'

const AllUsers = () => {
    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Registros de usuarias en el sistema</h3>
                        <AllUsersActionTools />
                    </div>
                    <AllUsersTableTools />
                    <AllUsersTable />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default AllUsers
