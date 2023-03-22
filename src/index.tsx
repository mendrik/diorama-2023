import { App } from './ui/app'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

void createRoot(document.body).render(
  <StrictMode>
    <App />
  </StrictMode>
)
