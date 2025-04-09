import { Card, Select, Switcher } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { apiGetMunicipalities } from '@/services/CommonService'
import { FormSectionBaseProps } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { Controller } from 'react-hook-form'
import useSWR from 'swr'


type ResidenceSectionProps = FormSectionBaseProps

const ResidenceSection = ({ control, errors }: ResidenceSectionProps) => {

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
                                placeholder="Calle 123"
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
                                placeholder="Avenida 456"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Número de casa o apartamento"
                    invalid={Boolean(errors.addresses?.[0]?.apartmentNumber)}
                    errorMessage={errors.addresses?.[0]?.apartmentNumber?.message}
                >
                    <Controller
                        name="addresses.0.apartmentNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Apto 123"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Código postal"
                    invalid={Boolean(errors.addresses?.[0]?.postalCode)}
                    errorMessage={errors.addresses?.[0]?.postalCode?.message}
                >
                    <Controller
                        name="addresses.0.postalCode"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="12345"
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
                    invalid={Boolean(errors.addresses?.[0]?.municipalityId)}
                    errorMessage={errors.addresses?.[0]?.municipalityId?.message}
                >
                    <Controller
                        name="addresses.0.municipalityId"
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

export default ResidenceSection