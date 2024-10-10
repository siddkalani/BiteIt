import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Bell, Search, Settings, ArrowUpRight, DollarSign, ShoppingCart, TrendingUp, XOctagon } from 'lucide-react';

const salesData = [
  { name: 'Jan', value: 300 },
  { name: 'Feb', value: 400 },
  { name: 'Mar', value: 350 },
  { name: 'Apr', value: 1000 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 550 },
];

const incomeData = [
  { name: 'Main Course', value: 10000 },
  { name: 'Beverage', value: 4000 },
  { name: 'Others', value: 1490 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const StatCard = ({ Icon, title, value, change, changeType }) => (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${
          Icon === DollarSign ? 'bg-yellow-100' :
          Icon === ShoppingCart ? 'bg-blue-100' :
          Icon === TrendingUp ? 'bg-green-100' :
          'bg-red-100'
        }`}>
          <Icon size={28} className={`${
            Icon === DollarSign ? 'text-yellow-600' :
            Icon === ShoppingCart ? 'text-blue-600' :
            Icon === TrendingUp ? 'text-green-600' :
            'text-red-600'
          }`} />
        </div>
        <div className="text-right">
          <span className={`text-sm font-medium flex items-center ${
            changeType === 'positive' ? 'text-green-500' : 'text-red-500'
          }`}>
            {changeType === 'positive' ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <XOctagon size={16} className="mr-1" />
            )}
            {change}
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-sm text-gray-500 font-semibold mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">${value.toLocaleString()}</p>
      </div>
    </div>
  );
  

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8 mt-12">
      <div className="w-full mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Hello, Rijal 👋</h1>
            <p className="text-gray-500">Here are some reports on your dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <StatCard Icon={DollarSign} title="Total sale" value={24064} change="27.4%" changeType="positive" />
  <StatCard Icon={ShoppingCart} title="Total order" value={14567} change="13.2%" changeType="positive" />
  <StatCard Icon={TrendingUp} title="Total revenue" value={87654} change="9.8%" changeType="positive" />
  <StatCard Icon={XOctagon} title="Cancelled order" value={983} change="4.5%" changeType="negative" />
</div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Income</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Income']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4">
              {incomeData.map((item, index) => (
                <div key={item.name} className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Transactions</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4">Name products</th>
                  <th className="pb-4">Date/Time</th>
                  <th className="pb-4">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Tomato</td>
                  <td className="py-2">Wed, 04 Jun 2023</td>
                  <td className="py-2">$30.00</td>
                </tr>
                <tr>
                  <td className="py-2">Egg</td>
                  <td className="py-2">Wed, 04 Jun 2023</td>
                  <td className="py-2">$30.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Trending menu</h2>
            <ul>
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h3 className="font-bold">Product Name</h3>
                      <p className="text-sm text-gray-500">+16.2%</p>
                    </div>
                  </div>
                  <ArrowUpRight className="text-green-500" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
