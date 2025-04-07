import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Outlet} from 'react-router';
import Schedule from '../user/schedule'; // Import trang Schedule
import avatarImage from '../../assets/image.png';
import logo from '../../assets/logo.png';
import Register from '../user/register'; // Import trang đăng ký lịch dạy bù

function HomePage() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
            className={`${
                isSidebarCollapsed ? 'w-20' : 'w-72' // Tăng chiều rộng khi mở rộng
            } bg-[#1E293B] text-white flex flex-col p-4 transition-all duration-300`}
            >
          {/* Header of Sidebar */}
          <div className="flex items-center justify-between mb-6">
            {/* Logo and Title */}
            {!isSidebarCollapsed && (
                <div className="flex items-center space-x-4">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-md" // Thêm bo góc, viền và đổ bóng
                />
                <span className="text-xl font-semibold">Quản lý thời khóa biểu</span>
                </div>
            )}
            {/* Toggle Button */}
            <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="bg-transparent text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                />
                </svg>
            </button>
            </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-4">
                <li>
                <Link
                    to="/schedule"
                    className={`flex items-center text-lg font-semibold p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300`}
                >
                    {/* Calendar Icon */}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                    </svg>
                    {/* Show text only when sidebar is not collapsed */}
                    {!isSidebarCollapsed && <span className="ml-2">Xem thời khóa biểu</span>}
                </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className={`flex items-center text-lg font-semibold p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300`}
                  >
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    {/* Text */}
                    {!isSidebarCollapsed && <span className="ml-2">Đăng ký lịch dạy bù</span>}
                  </Link>
                </li>
            </ul>
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="relative flex items-center">
              {/* Search Icon */}
              {!isSearchVisible && (
                <button
                  onClick={() => setIsSearchVisible(true)}
                  className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                    />
                  </svg>
                </button>
              )}

              {/* Search Input */}
              {isSearchVisible && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => setIsSearchVisible(false)} // Hide input when it loses focus
                  autoFocus
                />
              )}
            </div>
            <div className="relative flex items-center space-x-4">
              {/* Notification Bell */}
              <button
                onClick={() => alert('Thông báo')}
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 8 7.388 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0a3 3 0 11-6 0m6 0H9"
                  />
                </svg>
              </button>

              {/* Avatar */}
              <img
                src={avatarImage}  // Replace with actual avatar URL
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />

              {/* User Name */}
              <span className="text-gray-700 font-medium">Melusine</span>

              {/* Dropdown Arrow */}
              <button
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                    isDropdownVisible ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownVisible && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">                
                  {/* Logout Button */}
                  <button
                    onClick={() => alert('Đăng xuất')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Content Area */}
          <section className="flex-1 p-6">
              <Outlet></Outlet>
          </section>
        </main>
      </div>
  );
}

export default HomePage;