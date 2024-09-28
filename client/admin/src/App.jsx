import React, { useState } from 'react';
import { Search, Bell, ChevronDown, MoreVertical, ChevronRight, Upload } from 'lucide-react';

const ProductManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('Main course');
  const [products, setProducts] = useState([
    { name: 'Crispy Dory Sambal Matah', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
    { name: 'Kopag Benedict', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
    { name: 'Dory En Oats', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
    { name: 'Lemon Butter Dory', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
    { name: 'Spicy Tuna Nachos', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
    { name: 'Alfredo', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
    { name: 'Blackpaper Chicken', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            <div className="bg-black rounded-full p-4">
              <span className="text-black text-xl"></span>
            </div>
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-500 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Dashboard
              </a>
              <a href="#" className="text-gray-500 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Order List
              </a>
              <a href="#" className="text-gray-500 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </a>
              <a href="#" className="text-gray-500 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Bills
              </a>
              <a href="#" className="text-blue-600 font-medium flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Products Management
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Bell size={20} className="text-gray-500" />
              <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          <div className="flex-grow">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold ">Products Management</h1>
              <div className="flex relative space-x-3">
                <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border rounded-md" />
                <Search className="absolute left-0 top-3 text-gray-400" size={18} />
                <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md">+ Add new menu</button>
              </div>

            </div>
            <div className="flex justify-between mb-6">
              {['All', 'Main course', 'Appetizer', 'Dessert', 'Beverage'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Products <span className="text-blue-500 text-sm ml-2">120</span></h2>
                <MoreVertical size={20} className="text-gray-400" />
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2 font-medium">Product name</th>
                      <th className="py-2 font-medium">Code</th>
                      <th className="py-2 font-medium">Category</th>
                      <th className="py-2 font-medium">Stock</th>
                      <th className="py-2 font-medium">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-3">{product.name}</td>
                        <td className="py-3">{product.code}</td>
                        <td className="py-3">{product.category}</td>
                        <td className="py-3 text-blue-500">{product.stock}</td>
                        <td className="py-3">{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-500">Page 1 of 40</span>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((page) => (
                      <button key={page} className={`w-8 h-8 flex items-center justify-center rounded-full ${page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                        {page}
                      </button>
                    ))}
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Add product</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                      <Upload className="mx-auto text-gray-400" size={24} />
                      <p className="mt-1 text-sm text-gray-500">Upload or drag image</p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <div className="relative">
                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option>Select</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                      <div className="relative">
                        <input type="text" className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="$0" />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
                    <input type="text" className="block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Input product name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code product</label>
                    <input type="text" className="block w-full sm:text-sm border-gray-300 rounded-md" placeholder="####" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <div className="relative">
                      <input type="number" className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md" placeholder="0" />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md">Reset</button>
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-md">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductManagementDashboard;