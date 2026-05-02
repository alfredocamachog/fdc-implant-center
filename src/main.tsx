import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const loader = document.getElementById('page-loader')
if (loader) {
  const hideLoader = () => {
    loader.classList.add('is-hidden')
    window.setTimeout(() => loader.remove(), 260)
  }

  if (document.readyState === 'complete') {
    hideLoader()
  } else {
    window.addEventListener('load', hideLoader, { once: true })
  }
}
