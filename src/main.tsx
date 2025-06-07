
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/base.css'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement)

// Enhanced error boundary for Strapi connection issues
function renderWithErrorHandling() {
  try {
    root.render(<App />)
  } catch (error) {
    console.error('Failed to render app:', error)
    
    // Check if it's a Strapi-related error
    const isStrapiError = error instanceof Error && 
      (error.message.includes('strapi') || 
       error.message.includes('fetch') || 
       error.message.includes('network'))
    
    const errorMessage = isStrapiError 
      ? "We're having trouble connecting to our content services. The app may have limited functionality."
      : "We're having trouble loading the application."
    
    // Show a user-friendly error message - rootElement is guaranteed to exist here
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 2rem;
        ">
          <h1 style="color: #1869D3; margin-bottom: 1rem; font-size: 2rem;">CleanCraft</h1>
          <p style="color: #666; max-width: 500px; margin-bottom: 2rem; line-height: 1.5;">
            ${errorMessage}
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: #1869D3;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              cursor: pointer;
              font-size: 1rem;
            "
          >
            Try Again
          </button>
          ${isStrapiError ? `
            <p style="color: #888; font-size: 0.875rem; margin-top: 1rem;">
              If this problem persists, some content may be temporarily unavailable.
            </p>
          ` : ''}
        </div>
      `
    }
  }
}

// Handle unhandled promise rejections (useful for Strapi connection issues)
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  
  // Don't show error UI for every promise rejection, but log them
  if (event.reason?.message?.includes('strapi') || event.reason?.message?.includes('fetch')) {
    console.warn('Strapi connection issue detected, but app should continue with fallback content')
  }
})

renderWithErrorHandling()
