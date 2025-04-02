import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import { Toaster } from 'sonner'
import { toastConfig } from '@/configs/toast.config'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    return (
        <Theme>
            <Toaster {...toastConfig} />
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Views />
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </Theme>
    )
}

export default App
