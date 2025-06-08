import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles, StyledEngineProvider } from '@mui/material'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            <App />
    </StyledEngineProvider>
    </BrowserRouter>
)
