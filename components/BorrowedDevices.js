"use client";
import React, { useEffect, useState } from 'react';

export default function BorrowedDevices() {
  const [borrowedDevices, setBorrowedDevices] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);

    const storedDevices = JSON.parse(localStorage.getItem('devices')) || [];
    const userBorrowedDevices = storedDevices.filter(
      device => !device.available && device.borrowedBy === user?.id
    );
    setBorrowedDevices(userBorrowedDevices);
  }, []);

  const handleReturnDevice = (deviceId) => {
    const storedDevices = JSON.parse(localStorage.getItem('devices')) || [];
    const updatedDevices = storedDevices.map(device =>
      device.id === deviceId
        ? { ...device, available: true, borrowedBy: null, returnTime: null }
        : device
    );

    localStorage.setItem('devices', JSON.stringify(updatedDevices));
    const userBorrowedDevices = updatedDevices.filter(
      device => !device.available && device.borrowedBy === currentUser?.id
    );
    setBorrowedDevices(userBorrowedDevices);
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">My Borrowed Devices</h3>
      {borrowedDevices.length > 0 ? (
        <ul className="space-y-4">
          {borrowedDevices.map(device => (
            <li key={device.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h4 className="text-xl font-semibold">{device.name}</h4>
              <p>OS: {device.os}</p>
              <p>Version: {device.version}</p>
              <p>Return Time: {new Date(device.returnTime).toLocaleString()}</p>
              <button
                onClick={() => handleReturnDevice(device.id)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Return Device
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't borrowed any devices yet.</p>
      )}
    </div>
  );
}