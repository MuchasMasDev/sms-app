import { lazy, Suspense } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'

const Profile = lazy(() => import('./components/SettingsProfile'))
const Security = lazy(() => import('./components/SettingsSecurity'))

const Settings = () => {
    return (
        <AdaptiveCard className="h-full">
            <div className="flex flex-auto flex-col h-full">
                <Suspense fallback={<></>}>
                    <Profile />
                    <Security />
                </Suspense>
            </div>
        </AdaptiveCard>
    )
}

export default Settings
