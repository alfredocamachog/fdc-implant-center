import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'

const loader = document.getElementById('page-loader')
const hideLoader = () => {
  if (!loader) return
  loader.classList.add('is-hidden')
  window.setTimeout(() => loader.remove(), 260)
}

try {
  ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (error) {
  console.error('Render error:', error)
} finally {
  if (document.readyState === 'complete') {
    hideLoader()
  } else {
    window.addEventListener('load', hideLoader, { once: true })
  }
  window.setTimeout(hideLoader, 1800)
}
