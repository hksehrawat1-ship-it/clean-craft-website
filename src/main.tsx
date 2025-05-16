import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement)

try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} catch (error) {
  console.error('Failed to render app:', error)
  // Show a user-friendly error message
  rootElement.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      font-family: system-ui, -apple-system, sans-serif;
    ">
      <h1 style="color: #1869D3; margin-bottom: 1rem;">Something went wrong</h1>
      <p style="color: #666; max-width: 400px;">
        We're having trouble loading the application. Please try refreshing the page.
        If the problem persists, contact support.
      </p>
    </div>
  `
}
