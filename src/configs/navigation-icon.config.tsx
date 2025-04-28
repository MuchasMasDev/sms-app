import { PiBank, PiHouseLineDuotone, PiStudent } from 'react-icons/pi'
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    scholarsMenu: <PiStudent />,
    banks: <PiBank />,
}

export default navigationIcon
