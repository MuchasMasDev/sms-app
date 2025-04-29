import { AdaptiveCard, Container } from "@/components/shared"
import BanksActionTools from "./components/BanksActionTools"
import BanksTable from "./components/BanksTable"
import { useBanks } from "@/modules/catalogs"

const BankList = () => {

    const { mutate } = useBanks()

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Colección de bancos dentro del sistema</h3>
                        <BanksActionTools onUpdate={() => { mutate }} />
                    </div>
                    {/*<BanksTableTools />*/}
                    <BanksTable />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default BankList