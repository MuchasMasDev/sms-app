import Avatar from '@/components/ui/Avatar'
// eslint-disable-next-line import/named
import { Link } from 'react-scroll'
import { TbUserSquare, TbMapPin, TbBuildingBank, TbMedicalCross, TbPhone } from 'react-icons/tb'

const navigationList = [
    {
        label: 'Detalles personales',
        description: 'Estos datos serán utilizados para la creación de credenciales para el sistema.',
        link: 'customerDetails',
        icon: <TbUserSquare />,
    },
    {
        label: 'Contacto de Emergencia',
        description: 'Persona a quién llamar en caso que la becaria tenga una emergencia.',
        link: 'emergencyContact',
        icon: <TbMedicalCross />,
    },
    {
        label: 'Residencia',
        description: 'Dirección de residencia actual de la becaria.',
        link: 'addressInformation',
        icon: <TbMapPin />,
    },
    {
        label: 'Teléfonos',
        description: 'Números telefónicos de contacto de la becaria.',
        link: 'phoneInformation',
        icon: <TbPhone />,
    },
    {
        label: 'Información Bancaria',
        description: 'Completa la información bancaria actual y relevante de la becaria.',
        link: 'payment',
        icon: <TbBuildingBank />,
    }
]

const Navigator = () => {
    return (
        <div className="flex flex-col gap-2">
            {navigationList.map((nav) => (
                <Link
                    key={nav.label}
                    activeClass="bg-gray-100 dark:bg-gray-700 active"
                    className="cursor-pointer p-4 rounded-xl group hover:bg-gray-100 dark:hover:bg-gray-700"
                    to={nav.link}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-80}
                >
                    <span className="flex items-center gap-2">
                        <Avatar
                            icon={nav.icon}
                            className="bg-gray-100 dark:bg-gray-700 group-hover:bg-white group-[.active]:bg-white dark:group-hover:bg-gray-800 dark:group-[.active]:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                        <span className="flex flex-col flex-1">
                            <span className="heading-text font-bold">
                                {nav.label}
                            </span>
                            <span>{nav.description}</span>
                        </span>
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default Navigator
