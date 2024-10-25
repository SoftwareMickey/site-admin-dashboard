import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/home/Dashboard'
import DashboardLayout from './DashboardLayout'
import Agents from './pages/agents/Agents'
import Subscription from './pages/subscriptions/Subscription'

const routes = createBrowserRouter([
  {
    path: '',
    element: <RootLayout/>,
    children: [
      {index: true, path: '', element: <LandingPage/>},
      {path: 'agents', element: <Agents/>},
      {path: 'subscriptions', element: <Subscription/>}
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout/>,
    children: [
      {index: true, path: '', element: <Dashboard/>}
    ]
  },
])

function App() {
  return <RouterProvider router={routes}/>
}

export default App
