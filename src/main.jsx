import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './assets/context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />

  </AuthProvider>
)
