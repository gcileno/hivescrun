import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import PrivateRoute from  './routes/PrivateRoute.jsx'

import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Projects from './pages/Projects.jsx'
import Organization from './pages/Organization.jsx'
import OrganizationDetails from './pages/OrganizationDetails.jsx'
import HomeIndex from './pages/HomeIndex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/home/*" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeIndex />} />
          <Route path="projects" element={<Projects />} />
          <Route path="organizations" element={<Organization />} />
          <Route path="organizations/:organizationId" element={<OrganizationDetails />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)