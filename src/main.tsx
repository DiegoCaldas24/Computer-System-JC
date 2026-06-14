import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import { RouterProvider} from 'react-router-dom'
import { StrictMode } from 'react'
import { router } from './app/router/AppRouter'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)