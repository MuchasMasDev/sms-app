import { Card, Select, Switcher } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { apiGetMunicipalities } from '@/services/CommonService'
import { CreateScholarSchemaType, FormSectionBaseProps } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { useEffect, useState } from 'react'
import { Controller, UseFormSetValue } from 'react-hook-form'
import useSWR from 'swr'

const currentAddressOptions = [
    { value: '1', label: 'Casa Sol' },
    { value: '2', label: 'Casa Luna' },
    { value: '3', label: 'Otro' },
]

const residenceMap = new Map([
    ['1', {
        streetLine1: 'Colonia Toluca',
        streetLine2: 'Calle Palmeral #120',
        isUrban: true,
        districtId: '24',
    }],
    ['2', {
        streetLine1: 'Colonia Toluca',
        streetLine2: 'Calle Palmeral #156',
        isUrban: true,
        districtId: '24',
    }],
    ['3', {
        streetLine1: '',
        streetLine2: '',
        isUrban: false,
        districtId: '',
    }],
])

type CurrentResidenceSectionProps = FormSectionBaseProps & {
    setValue: UseFormSetValue<CreateScholarSchemaType>
}

const CurrentResidenceSection = ({ control, errors, setValue }: CurrentResidenceSectionProps) => {

    const { data, isLoading } = useSWR(['/api/residences/municipalities'], () => apiGetMunicipalities())
    const [currentAddress, setCurrentAddress] = useState(currentAddressOptions[0].value)

    // Update form values when currentAddress changes
    useEffect(() => {
        if (currentAddress) {
            const residence = residenceMap.get(currentAddress)
            if (residence) {
                // Update all form fields with values from the map
                setValue('currentAddress.streetLine1', residence.streetLine1)
                setValue('currentAddress.streetLine2', residence.streetLine2)
                setValue('currentAddress.isUrban', residence.isUrban)
                setValue('currentAddress.districtId', +residence.districtId)
            }
        }
    }, [currentAddress, setValue])

    return (
        <Card id='addressInformation'>
            <h4 className="mb-6">Residencia actual de la becaria</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <Select
                    isClearable
                    className="col-span-2"
                    placeholder="Seleccione una residencia"
                    options={currentAddressOptions}
                    value={currentAddressOptions.find(opt => opt.value === currentAddress) || null}
                    onChange={(option) => {
                        setCurrentAddress(option?.value ?? '3') // Default to 'Otro' if nothing selected
                    }}
                />
                <FormItem
                    label="Dirección"
                    invalid={Boolean(errors.currentAddress?.streetLine1)}
                    errorMessage={errors.currentAddress?.streetLine1?.message}
                >
                    <Controller
                        name="currentAddress.streetLine1"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Calle 123"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Dirección complementaria"
                    invalid={Boolean(errors.currentAddress?.streetLine2)}
                    errorMessage={errors.currentAddress?.streetLine2?.message}
                >
                    <Controller
                        name="currentAddress.streetLine2"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Avenida 456"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="¿Es una dirección de residencia urbana?"
                    invalid={Boolean(errors.currentAddress?.isUrban)}
                    errorMessage={errors.currentAddress?.isUrban?.message}
                >
                    <Controller
                        name="currentAddress.isUrban"
                        control={control}
                        render={({ field }) => (
                            <Switcher
                                {...field}
                                checked={field.value}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Municipio"
                    invalid={Boolean(errors.currentAddress?.districtId)}
                    errorMessage={errors.currentAddress?.districtId?.message}
                >
                    <Controller
                        name="currentAddress.districtId"
                        control={control}
                        render={({ field }) => {
                            const options = data?.map((municipality) => ({
                                ...municipality,
                                value: municipality.id,
                                label: `${municipality.name}`
                            }));

                            return (
                                <Select
                                    isClearable
                                    placeholder="Seleccione un distrito"
                                    noOptionsMessage={() => 'No hay distritos'}
                                    isLoading={isLoading}
                                    options={options}
                                    {...field}
                                    value={options?.find(opt => opt.id === field.value) || null}
                                    onChange={(option) => field.onChange(option?.id)}
                                />
                            );
                        }}
                    />
                </FormItem>
            </div>

        </Card>
    )
}

export default CurrentResidenceSection