import { Card, Select, Switcher } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { apiGetMunicipalities } from '@/services/CommonService'
import { FormSectionBaseProps } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { Controller } from 'react-hook-form'
import useSWR from 'swr'


type OriginResidenceSectionProps = FormSectionBaseProps

const OriginResidenceSection = ({ control, errors }: OriginResidenceSectionProps) => {

    const { data, isLoading } = useSWR(['/api/residences/municipalities'], () => apiGetMunicipalities())

    return (
        <Card id='addressInformation'>
            <h4 className="mb-6">Residencia de origen de la becaria</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Dirección"
                    invalid={Boolean(errors.addresses?.[0]?.streetLine1)}
                    errorMessage={errors.addresses?.[0]?.streetLine1?.message}
                >
                    <Controller
                        name="addresses.0.streetLine1"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Barrio Santa Lucía"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Dirección complementaria"
                    invalid={Boolean(errors.addresses?.[0]?.streetLine2)}
                    errorMessage={errors.addresses?.[0]?.streetLine2?.message}
                >
                    <Controller
                        name="addresses.0.streetLine2"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Cantón El Perico"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="¿Es una dirección de residencia urbana?"
                    invalid={Boolean(errors.addresses?.[0]?.isUrban)}
                    errorMessage={errors.addresses?.[0]?.isUrban?.message}
                >
                    <Controller
                        name="addresses.0.isUrban"
                        control={control}
                        render={({ field }) => (
                            <Switcher
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Municipio"
                    invalid={Boolean(errors.addresses?.[0]?.districtId)}
                    errorMessage={errors.addresses?.[0]?.districtId?.message}
                >
                    <Controller
                        name="addresses.0.districtId"
                        control={control}
                        render={({ field }) => {
                            const options = data?.map((municipality) => ({
                                ...municipality,
                                value: municipality.id,
                                label: municipality.name
                            }));

                            return (
                                <Select
                                    isClearable
                                    placeholder="Seleccione un municipio"
                                    noOptionsMessage={() => 'No hay municipios'}
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

export default OriginResidenceSection