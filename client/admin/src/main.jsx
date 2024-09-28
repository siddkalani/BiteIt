import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ProductManagementDashboard from './App';
import './index.css';

// Define the main routing structure
const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main app route */}
        <Route path="/" element={<App />}>
          {/* Nested routes under App */}
          
          {/* Parent route for product management */}
          <Route path="products" element={<ProductManagementDashboard />}>
            
            {/* Child route for product details */}
            {/* <Route path=":productId" element={<ProductDetails />} /> */}
            
          </Route>
        </Route>
        
        {/* You can define other routes outside App if needed */}
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

