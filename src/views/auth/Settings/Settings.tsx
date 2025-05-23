import { lazy, Suspense } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import { AuthorityCheck } from '@/components/shared'
import { useAuth } from '@/auth'

const Profile = lazy(() => import('./components/SettingsProfile'))
const Security = lazy(() => import('./components/SettingsSecurity'))
const ScholarFileSheet = lazy(() => import('./components/ScholarFileSheet'))

const Settings = () => {
    const { user } = useAuth()
    return (
        <section className='flex flex-col gap-8'>
            <AdaptiveCard className="h-full">
                <div className="flex flex-auto flex-col h-full">
                    <Suspense fallback={<></>}>
                        <Profile />
                        <Security />
                    </Suspense>
                </div>
            </AdaptiveCard>
            <AuthorityCheck
                authority={['SCHOLAR']}
                userAuthority={user.roles}
            >
                <AdaptiveCard className="h-full">
                    <div className="flex flex-auto flex-col h-full">
                        <Suspense fallback={<></>}>
                            <ScholarFileSheet userId={user.id ?? ''} />
                        </Suspense>
                    </div>
                </AdaptiveCard>
            </AuthorityCheck>
        </section>
    )
}

export default Settings
