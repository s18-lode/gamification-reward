import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import GamificationLandingPage from '../pages/GamificationLandingPage'

// Main application routes configuration using React Router, defining
//  the layout and the landing page for the gamification section of the dashboard

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<GamificationLandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
