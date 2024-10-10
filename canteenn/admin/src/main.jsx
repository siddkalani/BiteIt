import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import { Provider } from 'react-redux';
// Import components and store
import Index from './routes/Index';
import ProductManagementDashboard from './App';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import History from './pages/History';
import Bills from './pages/Bills';
// import PhoneLoginForm from './pages/Login/LoginForm';
// import OtpVerificationForm from './pages/Login/OTP';
import store from '../../shared/store'

const router = createBrowserRouter([

  {

    path: '/',
    element: <Index />,
    children: [
      {
        path: '/product',
        element: <ProductManagementDashboard />
      },
      {
        index: true,
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/order-list',
        element: <OrderList />
      },
      {
        path: '/history',
        element: <History />
      },
      {
        path: '/bills',
        element: <Bills />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your app with Provider */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)