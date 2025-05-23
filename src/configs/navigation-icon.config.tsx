import { PiBank, PiHouseLineDuotone, PiStudent, PiUser } from 'react-icons/pi'
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    scholarsMenu: <PiStudent />,
    banks: <PiBank />,
    usersMenu: <PiUser />,
}

export default navigationIcon
