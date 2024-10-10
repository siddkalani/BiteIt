import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Bell, PersonStanding, User, MenuSquare, Menu, SquareActivityIcon } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          <div className="bg-black rounded-full p-4">
            <span className="text-white text-xl"></span> {/* Add your logo here */}
          </div>

          <nav className="flex space-x-8">
            {/* Navigation Links */}
            {[
              {
                name: 'Dashboard',
                path: '/',
                icon: (
                  <SquareActivityIcon className="w-5 h-5 mr-2"/>
                ),
              },
              {
                name: 'Order List',
                path: '/order-list',
                icon: (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
              },
              {
                name: 'History',
                path: '/history',
                icon: (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                name: 'Bills',
                path: '/bills',
                icon: (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                name: 'Products Management',
                path: '/product',
                icon: (
                  <svg className="w-5 h-5 mr-2 none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
              },
            ].map((item) => (
              <NavLink 
                key={item.name} 
                to={item.path} 
                className={({ isActive }) => 
                  `flex items-center ${isActive ? 'text-blue-600' : 'text-gray-500'}`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4 justify-center">
            <Bell size={20} className="text-gray-500" />
            <User size={21} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
