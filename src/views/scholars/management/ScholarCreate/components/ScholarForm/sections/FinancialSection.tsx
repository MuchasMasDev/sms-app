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

    const bankOptions = data?.map((bank) => ({
        ...bank,
        value: bank.id,
        label: bank.name
    })) || [];

    return (
        <Card id='payment'>
            <h4 className="mb-6">Información bancaria</h4>

            <div className="grid md:grid-cols-2 gap-4">
                {/* Número de cuenta */}
                <FormItem
                    label="Número de cuenta"
                    invalid={!!errors.bankAccounts?.[0]?.accountNumber}
                    errorMessage={errors.bankAccounts?.[0]?.accountNumber?.message}
                >
                    <Controller
                        name="bankAccounts.0.accountNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                autoComplete="off"
                                placeholder="123456789"
                            />
                        )}
                    />
                </FormItem>

                {/* Titular de la cuenta */}
                <FormItem
                    label="Titular de la cuenta"
                    invalid={!!errors.bankAccounts?.[0]?.accountHolder}
                    errorMessage={errors.bankAccounts?.[0]?.accountHolder?.message}
                >
                    <Controller
                        name="bankAccounts.0.accountHolder"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                autoComplete="off"
                                placeholder="Luis Rivera"
                            />
                        )}
                    />
                </FormItem>

                {/* Tipo de cuenta */}
                <FormItem
                    label="Tipo de cuenta"
                    invalid={!!errors.bankAccounts?.[0]?.accountType}
                    errorMessage={errors.bankAccounts?.[0]?.accountType?.message}
                >
                    <Controller
                        name="bankAccounts.0.accountType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                isClearable
                                placeholder="Seleccione un tipo de cuenta"
                                options={AccountTypeOptions}
                                value={AccountTypeOptions.find(opt => opt.value === field.value) || null}
                                onChange={(option) => field.onChange(option?.value || null)}
                            />
                        )}
                    />
                </FormItem>

                {/* Banco */}
                <FormItem
                    label="Banco"
                    invalid={!!errors.bankAccounts?.[0]?.bankId}
                    errorMessage={errors.bankAccounts?.[0]?.bankId?.message}
                >
                    <Controller
                        name="bankAccounts.0.bankId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                isClearable
                                placeholder="Seleccione un banco"
                                isLoading={isLoading}
                                options={bankOptions}
                                value={bankOptions.find(opt => opt.id === field.value) || null}
                                onChange={(option) => field.onChange(option?.id || null)}
                            />
                        )}
                    />
                </FormItem>

                {/* Campo oculto para isPrimary (siempre true para el único registro) */}
                <Controller
                    name="bankAccounts.0.isPrimary"
                    control={control}
                    defaultValue={true}
                    render={() => <></>}
                />
            </div>

            {/* Mostrar error general si existe */}
            {errors.bankAccounts && 'root' in errors.bankAccounts && (
                <div className="mt-4 text-red-500">
                    {errors.bankAccounts.root?.message}
                </div>
            )}
        </Card>
    )
}

export default FinancialSection