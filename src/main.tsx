import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Playground } from './playground/Playground'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
)
