import { Card } from "@/components/ui"
import { Tabs } from "@/components/ui"
import { ReactNode } from "react";

const { TabList, TabNav } = Tabs

type Item = {value: string; label: string; icon?: ReactNode}

type MenuProps = {items: Item[] }

const ProfileMenu = ({items}: MenuProps) =>{

    return(
        <Card className="w-full">
            <TabList className="flex flex-col gap-3">
                {items.map((it)=>(
                    <TabNav
                    key={it.value}
                    value={it.value}
                    className="w-full justify-start rounded-xl p-3 text-sm
                    text-gray-600 hover:!text-gray-600 hover:bg-gray-200
                    aria-[selected=true]:bg-gray-100 aria-[selected=true]:font-semibold
                    data-[state=active]:bg-gray-100 data-[state=active]:font-semibold"
                    >
                        {it.icon && <span className="mr-2">{it.icon}</span>}
                        {it.label}
                    </TabNav>
                ))}                
            </TabList>
        </Card>
    )

}

export default ProfileMenu