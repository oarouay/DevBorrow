"use client";
import React, { useEffect, useState } from 'react';

export default function DeviceCatalog() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [borrowDuration, setBorrowDuration] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Load devices and current user from local storage
  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem('devices'))
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    setDevices(storedDevices);
  }, []);

  const handleBorrowDurationChange = (e) => {
    setBorrowDuration(e.target.value);
  };

  const handleBorrowDevice = () => {
    if (!selectedDevice || !borrowDuration || !currentUser) return;

    const returnTime = new Date();
    returnTime.setHours(returnTime.getHours() + parseInt(borrowDuration));

    const updatedDevices = devices.map((device) =>
      device.id === selectedDevice.id
        ? {
            ...device,
            available: false,
            borrowedBy: currentUser.id,
            returnTime: returnTime.toISOString(),
            borrowDuration: borrowDuration
          }
        : device
    );

    localStorage.setItem('devices', JSON.stringify(updatedDevices));
    setDevices(updatedDevices);
    closeModal();
  };

  const closeModal = () => {
    setSelectedDevice(null);
    setBorrowDuration('');
  };

  const isDeviceAvailableForUser = (device) => {
    return device.available || device.borrowedBy === currentUser?.id;
  };

  const getDeviceStatus = (device) => {
    if (device.available) {
      return 'Available';
    }
    if (device.borrowedBy === currentUser?.id) {
      return 'Borrowed by you';
    }
    return 'Borrowed by another user';
  };

  return (
    <div className="relative">
      <h3 className="text-3xl font-bold mb-6">Device Catalog</h3>
      <ul className="space-y-4">
        {devices.map((device) => (
          <li
            key={device.id}
            onClick={() => isDeviceAvailableForUser(device) && setSelectedDevice(device)}
            className={`bg-white p-4 rounded-lg shadow-md border border-gray-200 ${
              isDeviceAvailableForUser(device) ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
            }`}
          >
            <h4 className="text-xl font-semibold">{device.name}</h4>
            <p>OS: {device.os}</p>
            <p>Version: {device.version}</p>
            <p>Status: {getDeviceStatus(device)}</p>
            {device.returnTime && !device.available && (
              <p>Return Time: {new Date(device.returnTime).toLocaleString()}</p>
            )}
          </li>
        ))}
      </ul>

      {selectedDevice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
            <button
              onClick={closeModal}
              className="absolute top-2 left-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <h4 className="text-2xl font-bold mb-4">{selectedDevice.name}</h4>
            <p><strong>OS:</strong> {selectedDevice.os}</p>
            <p><strong>Version:</strong> {selectedDevice.version}</p>
            <p><strong>Status:</strong> {getDeviceStatus(selectedDevice)}</p>

            {selectedDevice.available && (
              <div className="mt-4">
                <label className="block mb-2">Borrow Duration (in hours):</label>
                <input
                  type="number"
                  value={borrowDuration}
                  onChange={handleBorrowDurationChange}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                  placeholder="Enter duration"
                  min="1"
                />
                <button
                  onClick={handleBorrowDevice}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                >
                  Borrow Device
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}