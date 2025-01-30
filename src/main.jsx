import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.jsx'
import { Toaster } from './components/ui/sonner.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme" >
      <App />
      <Toaster position="top-center" />
    </ThemeProvider>
  </StrictMode>,
)
