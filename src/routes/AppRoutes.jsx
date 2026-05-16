import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import GamificationLandingPage from '../pages/GamificationLandingPage'

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
