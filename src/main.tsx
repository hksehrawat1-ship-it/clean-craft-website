
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/base.css'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement)

// Enhanced error boundary for mobile and Strapi connection issues
function renderWithErrorHandling() {
  try {
    root.render(<App />)
  } catch (error) {
    console.error('Failed to render app:', error)
    
    // Check if it's a mobile compatibility error
    const isMobileError = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && 
      (error instanceof Error && 
       (error.message.includes('syntax') || 
        error.message.includes('unexpected') ||
        error.message.includes('Promise')))
    
    // Check if it's a Strapi-related error
    const isStrapiError = error instanceof Error && 
      (error.message.includes('strapi') || 
       error.message.includes('fetch') || 
       error.message.includes('network'))
    
    let errorMessage = "We're having trouble loading the application."
    
    if (isMobileError) {
      errorMessage = "This app may not be compatible with your browser version. Please try updating your browser or using a different one."
    } else if (isStrapiError) {
      errorMessage = "We're having trouble connecting to our content services. The app may have limited functionality."
    }
    
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
          background: #1869D3;
          color: white;
        ">
          <h1 style="margin-bottom: 1rem; font-size: 2rem;">CleanCraft</h1>
          <p style="max-width: 500px; margin-bottom: 2rem; line-height: 1.5; font-size: 1.1rem;">
            ${errorMessage}
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: white;
              color: #1869D3;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              cursor: pointer;
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 1rem;
            "
          >
            Try Again
          </button>
          ${isMobileError ? `
            <p style="color: rgba(255,255,255,0.8); font-size: 0.875rem; margin-top: 1rem;">
              If this problem persists, try using Chrome, Safari, or another modern browser.
            </p>
          ` : ''}
          ${isStrapiError ? `
            <p style="color: rgba(255,255,255,0.8); font-size: 0.875rem; margin-top: 1rem;">
              If this problem persists, some content may be temporarily unavailable.
            </p>
          ` : ''}
        </div>
      `
    }
  }
}

// Handle unhandled promise rejections (useful for mobile compatibility and Strapi issues)
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  
  // Don't show error UI for every promise rejection, but log them for debugging
  if (event.reason?.message?.includes('strapi') || event.reason?.message?.includes('fetch')) {
    console.warn('Strapi connection issue detected, but app should continue with fallback content')
  }
})

// Add mobile debugging support
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  console.log('Mobile device detected:', navigator.userAgent)
  console.log('Screen dimensions:', window.screen.width, 'x', window.screen.height)
  console.log('Viewport dimensions:', window.innerWidth, 'x', window.innerHeight)
}

renderWithErrorHandling()
