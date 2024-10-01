import React, { useState } from 'react';
import { Bell, User, ChevronDown, MoreVertical, ChevronRight } from 'lucide-react';

const History = () => {
  const navItems = ['Dashboard', 'Order list', 'History', 'Bills', 'Products management'];
  const [activeTab, setActiveTab] = useState('All');
  const filterOptions = ['All', 'Waiting', 'Completed', 'Ready to Serve', 'Canceled'];
  const orderHistory = [
    { number: '#01015', dateTime: '10:00 AM', status: 'Paid', amount: 123.00 },
    { number: '#01015', dateTime: '09:35 PM', status: 'Paid', amount: 250.00 },
    { number: '#01015', dateTime: '17 May 2022', status: 'Paid', amount: 340.00 },
    { number: '#01015', dateTime: '17 May 2022', status: 'Paid', amount: 89.00 },
    { number: '#01015', dateTime: '17 May 2022', status: 'Paid', amount: 123.00 },
    { number: '#01015', dateTime: '17 May 2022', status: 'Paid', amount: 254.00 },
    { number: '#01015', dateTime: '17 May 2022', status: 'Paid', amount: 143.00 },
  ];
  const orderDetails = {
    orderNumber: '#12345',
    time: '10:34 AM',
    customer: 'Vinicius Bayu',
    table: 'Table 3A',
    dineOption: 'Dine In',
  };
  const orderItems = [
    { name: 'Crispy dory sambal matah', quantity: 1, specs: 'Medium - Not spicy', price: 101.00, image: '/api/placeholder/80/80' },
    { name: 'Spicy tuna nachos', quantity: 3, specs: 'Medium - Not spicy', price: 542.00, image: '/api/placeholder/80/80' },
    { name: 'Butterscotch', quantity: 3, specs: 'Medium - Not spicy', price: 132.00, image: '/api/placeholder/80/80' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen mt-12">

      <main className="flex flex-grow w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-2/3 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">History</h1>
            <span className="text-sm text-gray-500">Showing 9 order list</span>
          </div>

          <div className="relative flex justify-between bg-slate-300 mb-6 rounded-lg w-full">
              <div className="absolute top-0 left-0 w-full h-full">
                <div
                  className={`absolute bg-white rounded-lg drop-shadow-lg h-full w-1/5 transform transition-all ease-in-out duration-300`}
                  style={{
                    transform: `translateX(${['All', 'Waiting', 'Completed', 'Ready to Serve', 'Canceled'].indexOf(activeTab) * 100}%)`,
                  }}
                />
              </div>
              {['All', 'Waiting', 'Completed', 'Ready to Serve', 'Canceled'].map((tab) => (
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

          <div className="bg-white rounded-lg shadow flex flex-col flex-grow overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">History</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">120</span>
            </div>
            <div className="overflow-auto flex-grow">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 sticky top-0 bg-white">Order number <ChevronDown className="inline" /></th>
                    <th className="text-left p-4 sticky top-0 bg-white">Date/Time <ChevronDown className="inline" /></th>
                    <th className="text-left p-4 sticky top-0 bg-white">Payment status</th>
                    <th className="text-left p-4 sticky top-0 bg-white">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order, index) => (
                    <tr key={index} className={index === 1 ? 'bg-blue-50' : ''}>
                      <td className="p-4">{order.number}</td>
                      <td className="p-4">{order.dateTime}</td>
                      <td className="p-4 text-blue-500">{order.status}</td>
                      <td className="p-4">${order.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center p-4 border-t mt-auto">
              <span>Page 1 of 40</span>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 bg-gray-100 p-6 overflow-hidden flex flex-col">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col h-full overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">Detail history</h2>
            <div className="flex justify-between items-center mb-4">
              <span>Order Number {orderDetails.orderNumber}</span>
              <span>{orderDetails.time}</span>
            </div>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-100 p-3 rounded">
                <p>{orderDetails.customer}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <p>{orderDetails.table}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <p>{orderDetails.dineOption}</p>
              </div>
            </div>
            <h3 className="font-semibold mb-4">Order List</h3>
            <div className="space-y-4 overflow-auto flex-grow">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.quantity} Dish</p>
                    <p className="text-sm text-gray-500">{item.specs}</p>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="font-semibold mt-6 mb-4">Order summary</h3>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-auto">
              Print invoice
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;