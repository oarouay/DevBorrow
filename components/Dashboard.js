"use client";

import React, { useState } from 'react';
import DeviceCatalog from './DeviceCatalog';
import BorrowedDevices from './BorrowedDevices';

export default function Dashboard() {
  const [activeView, setActiveView] = useState('catalog');

  return (
    <div className="relative flex flex-col h-screen bg-gray-100">
      <div className="flex h-full">
        {/* Side Menu */}
        <div className="hidden md:w-1/5 md:flex md:flex-col md:gap-6 bg-white border-r border-gray-300 p-4">
          <h2 className="text-2xl font-bold text-indigo-600">Dashboard</h2>
          <button 
            className={`text-lg p-2 rounded-lg text-left ${activeView === 'catalog' ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'text-gray-700'}`}
            onClick={() => setActiveView('catalog')}
          >
            Device Catalog
          </button>
          <button 
            className={`text-lg p-2 rounded-lg text-left ${activeView === 'borrowed' ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'text-gray-700'}`}
            onClick={() => setActiveView('borrowed')}
          >
            My Borrowed Devices
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-4/5 p-6 overflow-y-auto">
          {activeView === 'catalog' ? <DeviceCatalog /> : <BorrowedDevices />}
        </div>
      </div>

      {/* Fixed Bottom Buttons for Mobile View */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-white border-t border-gray-300 md:hidden">
        <button 
          className={`text-lg p-2 rounded-lg w-full text-center ${activeView === 'catalog' ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'text-gray-700'}`}
          onClick={() => setActiveView('catalog')}
        >
          Catalog
        </button>
        <button 
          className={`text-lg p-2 rounded-lg w-full text-center ${activeView === 'borrowed' ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'text-gray-700'}`}
          onClick={() => setActiveView('borrowed')}
        >
          Borrowed
        </button>
      </div>
    </div>
  );
}
