import React, { useState } from 'react';
import { Search, Bell, ChevronRight } from 'lucide-react';

const orderStatuses = ['All', 'Waiting', 'Completed', 'Ready to Serve', 'Canceled'];

const OrderCard = ({ order }) => (
  <div className="bg-white p-6 rounded-lg shadow mb-4">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mr-4 ${
          order.status === 'Canceled' ? 'bg-blue-500' :
          order.status === 'Waiting' ? 'bg-red-500' :
          order.status === 'Ready to Serve' ? 'bg-green-500' :
          'bg-blue-500'
        }`}>
          CA
        </div>
        <div>
          <h3 className="font-bold">{order.customerName}</h3>
          <p className="text-sm text-gray-500">{order.orderDetails}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${
        order.status === 'Canceled' ? 'bg-red-100 text-red-600' :
        order.status === 'Waiting' ? 'bg-yellow-100 text-yellow-600' :
        order.status === 'Ready to Serve' ? 'bg-green-100 text-green-600' :
        'bg-blue-100 text-blue-600'
      }`}>
        {order.status}
      </span>
    </div>
    <p className="text-sm text-gray-500 mb-4">{order.date} {order.time}</p>
    <table className="w-full mb-4">
      <thead>
        <tr className="text-left text-gray-500">
          <th className="pb-2">Item</th>
          <th className="pb-2">Qty</th>
          <th className="pb-2">Price</th>
        </tr>
      </thead>
      <tbody>
        {order.items.map((item, index) => (
          <tr key={index}>
            <td className="py-1">{item.name}</td>
            <td className="py-1">{item.quantity}</td>
            <td className="py-1">${item.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex justify-between items-center">
      <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
      <div className="space-x-2">
        <button className="px-4 py-2 bg-gray-100 text-blue-600 rounded-lg">See Detail</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Pay Bills</button>
      </div>
    </div>
  </div>
);

const OrderList = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('All');
  // Mock data for demonstration
  const orders = [
    {
      customerName: 'Cheryl Arema',
      orderDetails: 'Order #1234 / Dine in',
      status: 'Canceled',
      date: 'Wed, July 12, 2024',
      time: '10:20 AM',
      items: [
        { name: 'Crispy Dory Sambal Matah', quantity: 1, price: 451.00 },
        { name: 'Spicy Tuna Nachos', quantity: 2, price: 242.00 },
        { name: 'Butterscotch', quantity: 3, price: 132.00 },
      ],
      total: 542.00
    },
    {
        customerName: 'Cheryl Arema',
        orderDetails: 'Order #1234 / Dine in',
        status: 'Canceled',
        date: 'Wed, July 12, 2024',
        time: '10:20 AM',
        items: [
          { name: 'Crispy Dory Sambal Matah', quantity: 1, price: 451.00 },
          { name: 'Spicy Tuna Nachos', quantity: 2, price: 242.00 },
          { name: 'Butterscotch', quantity: 3, price: 132.00 },
        ],
        total: 542.00
      },
      {
        customerName: 'Cheryl Arema',
        orderDetails: 'Order #1234 / Dine in',
        status: 'Canceled',
        date: 'Wed, July 12, 2024',
        time: '10:20 AM',
        items: [
          { name: 'Crispy Dory Sambal Matah', quantity: 1, price: 451.00 },
          { name: 'Spicy Tuna Nachos', quantity: 2, price: 242.00 },
          { name: 'Butterscotch', quantity: 3, price: 132.00 },
        ],
        total: 542.00
      },
      {
        customerName: 'Cheryl Arema',
        orderDetails: 'Order #1234 / Dine in',
        status: 'Canceled',
        date: 'Wed, July 12, 2024',
        time: '10:20 AM',
        items: [
          { name: 'Crispy Dory Sambal Matah', quantity: 1, price: 451.00 },
          { name: 'Spicy Tuna Nachos', quantity: 2, price: 242.00 },
          { name: 'Butterscotch', quantity: 3, price: 132.00 },
        ],
        total: 542.00
      },
    // ... add more mock orders here
  ];

  return (
    <div className="bg-gray-100 min-h-screen mt-12">
    <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order List</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex items-center">
            <span className="mr-2">Date</span>
            <span className="font-medium mr-2">22/02/2024</span>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Sliding bar section */}
      <div className="shadow mb-6">
        <div className="relative flex justify-between bg-slate-300 rounded-lg w-full">
          <div className="absolute top-0 left-0 w-full h-full">
            <div
              className={`absolute bg-white rounded-lg drop-shadow-lg h-full w-1/5 transform transition-all ease-in-out duration-300`}
              style={{
                transform: `translateX(${['All', 'Completed', 'Ready to serve', 'Waiting', 'Canceled'].indexOf(activeTab) * 100}%)`,
              }}
            />
          </div>
          {['All', 'Completed', 'Ready to serve', 'Waiting', 'Canceled'].map((tab) => (
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
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Customer List</h2>
        <p className="text-gray-500">Showing 30 Items</p>
      </div>

      {/* Grid layout for displaying 3 bills per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </main>
  </div>
  );
};

export default OrderList;