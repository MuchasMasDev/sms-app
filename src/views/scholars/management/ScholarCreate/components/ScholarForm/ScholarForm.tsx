import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Affix from '@/components/shared/Affix'
import Card from '@/components/ui/Card'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import useLayoutGap from '@/utils/hooks/useLayoutGap'
import useResponsive from '@/utils/hooks/useResponsive'
import isEmpty from 'lodash/isEmpty'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CommonProps } from '@/@types/common'
import {
    CreateScholarSchema,
    CreateScholarSchemaType,
} from '@/views/scholars/management/ScholarCreate/components/ScholarForm/ScholarFormSchemas'
import UserDetailSection from '@/views/scholars/management/ScholarCreate/components/ScholarForm/sections/UserDetailSection'
import Navigator from '@/views/scholars/management/ScholarCreate/components/ScholarForm/Navigator'
import EmergencyContactSection
    from '@/views/scholars/management/ScholarCreate/components/ScholarForm/sections/EmergencyContactSection'

type ScholarFormProps = {
    children: ReactNode
    onFormSubmit: (values: CreateScholarSchemaType) => void
    defaultValues?: CreateScholarSchemaType
    newOrder?: boolean
} & CommonProps

const ScholarForm = (props: ScholarFormProps) => {
    const { onFormSubmit, children, defaultValues } = props

    const { getTopGapValue } = useLayoutGap()

    const { larger } = useResponsive()

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = (values: CreateScholarSchemaType) => {
        onFormSubmit?.(values)
    }

    const {
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        control,
    } = useForm<CreateScholarSchemaType>({
        defaultValues: {
            ...(defaultValues ? defaultValues : {}),
        },
        resolver: zodResolver(CreateScholarSchema),
    })

    const hasDisability = watch('hasDisability', '')

    return (
        <div className="flex">
            <Form
                className="flex-1 flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container className="mb-32">
                    <div className="flex gap-4">
                        {larger.xl && (
                            <div className="w-[360px]">
                                <Affix offset={getTopGapValue()}>
                                    <Card>
                                        <Navigator />
                                    </Card>
                                </Affix>
                            </div>
                        )}

                        <div className="flex-1">
                            <div className="flex flex-col gap-4">
                                <UserDetailSection
                                    control={control}
                                    errors={errors}
                                    disability={hasDisability}
                                />
                                <EmergencyContactSection
                                    control={control}
                                    errors={errors}
                                />
                                {/*<ResidenceSection
                                    control={control}
                                    errors={errors}
                                />*/}
                                {/*<PhoneNumberSection
                                    control={control}
                                    errors={errors}
                                />*/}
                                {/*<FinancialSection
                                    control={control}
                                    errors={errors}
                                />*/}
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>
                    {children}
                </BottomStickyBar>
            </Form>
        </div>
    )
}

export default ScholarForm
