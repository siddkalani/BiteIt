import React from 'react';
import { Bell, ChevronRight, Printer, Trash2 } from 'lucide-react';

const Bills = () => {
  const billsData = [
    { id: 1, name: 'Cheryl Arema', table: '10A', orderNumber: '#12532', status: 'Completed', items: 3 },
    { id: 2, name: 'Cheryl Arema', table: '10A', orderNumber: '#12532', status: 'Completed', items: 3 },
    { id: 3, name: 'Cheryl Arema', table: '10A', orderNumber: '#12532', status: 'Completed', items: 3 },
    { id: 4, name: 'Cheryl Arema', table: '10A', orderNumber: '#12532', status: 'Completed', items: 3 },
    { id: 5, name: 'Cheryl Arema', table: '10A', orderNumber: '#12532', status: 'Completed', items: 3 },
    { id: 6, name: 'Cheryl Arema', table: '10A', orderNumber: '#12532', status: 'Completed', items: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 mt-12">

      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Bills</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Date</span>
            <span className="text-sm font-medium">22/02/2024</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Bills</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              234
            </span>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <input
                type="search"
                placeholder="Search"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Table
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status oder
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {billsData.map((bill) => (
                      <tr key={bill.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{bill.name}</div>
                          <div className="text-sm text-gray-500">{bill.items} Items • Table {bill.table}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bill.table}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bill.orderNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {bill.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">
                            <Printer className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Page 1 of 40</span>
                <div className="inline-flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                    1
                  </button>
                  <button className="px-3 py-1 border border-transparent text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                    2
                  </button>
                  <button className="px-3 py-1 border border-transparent text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                    3
                  </button>
                  <button className="px-3 py-1 border border-transparent text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                    4
                  </button>
                  <button className="px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bills;