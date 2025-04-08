import { Card, Select } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { apiGetBanks } from '@/services/CommonService'
import { FormSectionBaseProps } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { Controller } from 'react-hook-form'
import useSWR from 'swr'

type FinancialSectionProps = FormSectionBaseProps

const AccountTypeOptions = [
    {
        label: 'Ahorros',
        value: 'SAVINGS',
    },
    {
        label: 'Corriente',
        value: 'CURRENT',
    }
];

const FinancialSection = ({ control, errors }: FinancialSectionProps) => {

    const { data, isLoading } = useSWR(['/api/catalogs/banks'], () => apiGetBanks())

    return (
        <Card id='payment'>
            <h4 className="mb-6">Información bancaria</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Número de cuenta"
                    invalid={Boolean(errors.bankAccounts?.[0]?.accountNumber)}
                    errorMessage={errors.bankAccounts?.[0]?.accountNumber?.message}
                >
                    <Controller
                        name="bankAccounts.0.accountNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="123456789"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Tipo de cuenta"
                    invalid={Boolean(errors.bankAccounts?.[0]?.accountType)}
                    errorMessage={errors.bankAccounts?.[0]?.accountType?.message}
                >
                    <Controller
                        name="bankAccounts.0.accountType"
                        control={control}
                        render={({ field }) => {
                            return (
                                <Select
                                    isClearable
                                    placeholder="Seleccione un tipo de cuenta"
                                    options={AccountTypeOptions.map(option => ({
                                        value: option.value,
                                        label: option.label
                                    }))}
                                    {...field}
                                    value={AccountTypeOptions.find(opt => opt.value === field.value) || null}
                                    onChange={(option) => field.onChange(option?.value)}
                                />
                            );
                        }}
                    />
                </FormItem>

                <FormItem
                    label="Banco"
                    invalid={Boolean(errors.bankAccounts?.[0]?.bankId)}
                    errorMessage={errors.bankAccounts?.[0]?.bankId?.message}
                >
                    <Controller
                        name="bankAccounts.0.bankId"
                        control={control}
                        render={({ field }) => {
                            const options = data?.map((bank) => ({
                                ...bank,
                                value: bank.id,
                                label: bank.name
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

export default FinancialSection