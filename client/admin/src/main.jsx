import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
// Import components and store
import Index from './routes/Index';
import ProductManagementDashboard from './App';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import History from './pages/History';
import Bills from './pages/Bills';

const router = createBrowserRouter([

  {
    path: '/',
    element: <Index />,
    children: [
      {
        index:true,
        path:'/',
        element: <ProductManagementDashboard />
      },
      {
        path:'/dashboard',
        element: <Dashboard />
      },
      {
        path:'/order-list',
        element: <OrderList />
      },
      {
        path:'/history',
        element: <History />
      },
      {
        path:'/bills',
        element: <Bills />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)