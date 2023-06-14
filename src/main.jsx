import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './Routes/Route.jsx'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './AuthProvider/AuthProvider.jsx'


// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'


// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <div className=' max-w-screen-xl mx-auto'>

            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>

      </HelmetProvider>
    </AuthProvider>
    
  </React.StrictMode>,
)
