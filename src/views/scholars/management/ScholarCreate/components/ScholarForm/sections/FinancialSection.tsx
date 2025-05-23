import { Button, Card, Select } from '@/components/ui'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { apiGetBanks } from '@/services/CommonService'
import { FormSectionBaseProps } from '@/views/scholars/management/ScholarCreate/components/ScholarForm'
import { useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
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

    const [newAccountInfo, setNewAccountInfo] = useState({
        accountNumber: '',
        accountHolder: '',
        accountType: undefined as "SAVINGS" | "CURRENT" | undefined,
        bankId: null as number | null
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'bankAccounts'
    });

    const handleAddAccount = () => {
        if (newAccountInfo.accountNumber && newAccountInfo.accountType && newAccountInfo.bankId && newAccountInfo.accountHolder) {
            append({
                accountNumber: newAccountInfo.accountNumber,
                accountHolder: newAccountInfo.accountHolder,
                accountType: newAccountInfo.accountType,
                bankId: newAccountInfo.bankId,
                isPrimary: fields.length === 0 // First account is primary by default
            });

            // Reset form
            setNewAccountInfo({
                accountNumber: '',
                accountHolder: '',
                accountType: undefined,
                bankId: null
            });
        }
    };

    const handleSetPrimary = (index: number) => {
        // Update all accounts to ensure only one is primary
        fields.forEach((field, i) => {
            update(i, {
                ...field,
                isPrimary: i === index
            });
        });
    };

    const bankOptions = data?.map((bank) => ({
        ...bank,
        value: bank.id,
        label: bank.name
    })) || [];

    return (
        <Card id='payment'>
            <h4 className="mb-6">Información bancaria</h4>

            {/* Form to add new bank account */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <FormItem label="Número de cuenta">
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="123456789"
                        value={newAccountInfo.accountNumber}
                        onChange={(e) => setNewAccountInfo({
                            ...newAccountInfo,
                            accountNumber: e.target.value
                        })}
                    />
                </FormItem>
                <FormItem label="Titular de la cuenta">
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Luis Rivera"
                        value={newAccountInfo.accountHolder}
                        onChange={(e) => setNewAccountInfo({
                            ...newAccountInfo,
                            accountHolder: e.target.value
                        })}
                    />
                </FormItem>
                <FormItem label="Tipo de cuenta">
                    <Select
                        isClearable
                        placeholder="Seleccione un tipo de cuenta"
                        options={AccountTypeOptions}
                        value={AccountTypeOptions.find(opt => opt.value === newAccountInfo.accountType) || null}
                        onChange={(option) => setNewAccountInfo({
                            ...newAccountInfo,
                            accountType: option?.value as "SAVINGS" | "CURRENT" | undefined
                        })}
                    />
                </FormItem>
                <FormItem label="Banco">
                    <Select
                        isClearable
                        placeholder="Seleccione un banco"
                        isLoading={isLoading}
                        options={bankOptions}
                        value={bankOptions.find(opt => opt.id === newAccountInfo.bankId) || null}
                        onChange={(option) => setNewAccountInfo({
                            ...newAccountInfo,
                            bankId: option?.id || null
                        })}
                    />
                </FormItem>
                <div className="flex items-center">
                    <Button
                        type="button"
                        disabled={!newAccountInfo.accountNumber || !newAccountInfo.accountType || !newAccountInfo.bankId || !newAccountInfo.accountHolder}
                        onClick={handleAddAccount}
                    >
                        Agregar cuenta bancaria
                    </Button>
                </div>
            </div>

            {/* List of bank accounts */}
            {fields.length > 0 && (
                <div className="mt-6">
                    <h6 className="m-4">Cuentas bancarias registradas</h6>
                    <div className="grid gap-3">
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <Controller
                                    name={`bankAccounts.${index}.isPrimary`}
                                    control={control}
                                    render={({ field: fieldProps }) => (
                                        <Card
                                            className={`p-4 cursor-pointer transition-all duration-200 ${fieldProps.value
                                                ? "border-2 border-blue-500 bg-blue-50"
                                                : "bg-gray-50 hover:bg-gray-100"
                                                }`}
                                            onClick={() => {
                                                handleSetPrimary(index);
                                                fieldProps.onChange(true);
                                            }}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">
                                                        {field.accountHolder}
                                                    </span>
                                                    <span className="text-lg text-gray-800">
                                                        {field.accountNumber}
                                                    </span>
                                                    <div className="flex space-x-2 mt-1 text-sm">
                                                        <span>
                                                            {AccountTypeOptions.find(opt => opt.value === field.accountType)?.label}
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            {bankOptions.find(opt => opt.id === field.bankId)?.name || 'Banco'}
                                                        </span>
                                                    </div>
                                                    {fieldProps.value && (
                                                        <span className="text-sm text-blue-600 font-medium mt-2">
                                                            Cuenta principal
                                                        </span>
                                                    )}
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // If removing primary account, make another one primary
                                                        if (field.isPrimary && fields.length > 1) {
                                                            // Find next account to make primary
                                                            const newPrimaryIndex = index === 0 ? 1 : 0;
                                                            handleSetPrimary(newPrimaryIndex);
                                                        }
                                                        remove(index);
                                                    }}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </Card>
                                    )}
                                />
                                {errors.bankAccounts?.[index] && (
                                    <div className="mt-2 text-red-500 text-sm">
                                        {/* Display all possible errors for this account */}
                                        {errors.bankAccounts[index]?.accountNumber?.message ||
                                            errors.bankAccounts[index]?.accountType?.message ||
                                            errors.bankAccounts[index]?.bankId?.message}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Show error if no accounts */}
            {errors.bankAccounts && 'root' in errors.bankAccounts && (
                <div className="mt-2 text-red-500">
                    {errors.bankAccounts.root?.message}
                </div>
            )}
        </Card>
    )
}

export default FinancialSection