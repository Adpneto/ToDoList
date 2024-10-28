import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './Routes.tsx'
import { ThemeProvider } from './components/ui/theme-provider.tsx'
import { AuthProvider } from './firebaseConfig.tsx'
import './index.css'
import Layout from './lib/layout.tsx'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout children={<App />} />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
