import React, { useState } from 'react';
import { Search, Bell, ChevronDown, MoreVertical, ChevronRight, Upload } from 'lucide-react';

const ProductManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('All');
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
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="flex space-x-8">
          {/* Left Column */}
          <div className="flex-grow flex flex-col">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold">Products Management</h1>
              <div className="flex relative space-x-3">
                <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border rounded-md" />
                <Search className="absolute top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md">+ Add new menu</button>
              </div>
            </div>

            <div className="relative flex justify-between bg-slate-300 mb-6 rounded-lg w-full">
              <div className="absolute top-0 left-0 w-full h-full">
                <div
                  className={`absolute bg-white rounded-lg drop-shadow-lg h-full w-1/5 transform transition-all ease-in-out duration-300`}
                  style={{
                    transform: `translateX(${['All', 'Main course', 'Appetizer', 'Dessert', 'Beverage'].indexOf(activeTab) * 100}%)`,
                  }}
                />
              </div>
              {['All', 'Main course', 'Appetizer', 'Dessert', 'Beverage'].map((tab) => (
                <button
                  key={tab}
                  className={`relative px-4 py-2 whitespace-nowrap w-full z-10 ${activeTab === tab ? 'text-blue-600 font-semibold' : 'text-gray-600'
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>


            <div className="bg-white rounded-lg shadow flex-grow flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold flex items-center">
                  Products
                  <span className="text-white text-sm ml-2 bg-blue-500 px-2 py-1 rounded-full">{products.length}</span>
                </h2>
                <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
              </div>
              <div className="p-4 flex-grow overflow-auto">
                <table className="w-full table-auto">
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
                      <tr key={index} className="border-t hover:bg-gray-50">
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
                      <button
                        key={page}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/3 flex flex-col h-full">
            <div className="bg-white rounded-lg shadow flex-grow flex flex-col h-full">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Add Product</h2>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <form className="space-y-4 flex-grow flex flex-col">
                  <div className=''>
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
                          <option>Food</option>
                          <option>Beverage</option>
                          <option>Appetizer</option>
                          <option>Dessert</option>
                        </select>
                        {/* <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={18} /> */}
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                      <input
                        type="text"
                        className="block w-full pl-3 pr-3 sm:text-sm border-gray-300 rounded-md"
                        placeholder="$0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      className="block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Input product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
                    <input
                      type="text"
                      className="block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="####"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      className="block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex space-x-4 mt-auto">
                    <button
                      type="reset"
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </main>
  );
};

export default ProductManagementDashboard;
