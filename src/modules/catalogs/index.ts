import { Bank, Catalog } from "@/services/CatalogService"
import { createCatalogStore } from "./store/catalogStore"
import useCatalog from "./hooks/useCatalog"

// Store y hook específico para bancos
export const useBanksStore = createCatalogStore<Bank>()

export function useBanks() {
    const catalogReturn = useCatalog<Bank>(
        Catalog.Banks,
        useBanksStore
    )
    return catalogReturn
}