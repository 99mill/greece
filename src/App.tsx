import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { HomePage } from '@/pages/HomePage'
import { DietPage } from '@/pages/DietPage'
import { MedicalPage } from '@/pages/MedicalPage'
import { ItineraryPage } from '@/pages/ItineraryPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'diet', element: <DietPage /> },
      { path: 'medical', element: <MedicalPage /> },
      { path: 'itinerary', element: <ItineraryPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
