"use client";
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { deviceService } from '@/components/deviceservice';
export default function AddDevice() {
    const [formData, setFormData] = useState({
      name: '',
      os: '',
      version: '',
      serialNumber: '',
      description: ''
    });
  
    const [message, setMessage] = useState({ type: '', text: '' });
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(user);
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const validateForm = () => {
      if (!formData.name.trim()) {
        setMessage({ type: 'error', text: 'Device name is required' });
        return false;
      }
      if (!formData.os.trim()) {
        setMessage({ type: 'error', text: 'Operating system is required' });
        return false;
      }
      if (!formData.version.trim()) {
        setMessage({ type: 'error', text: 'Version is required' });
        return false;
      }
      if (!formData.serialNumber.trim()) {
        setMessage({ type: 'error', text: 'Serial number is required' });
        return false;
      }
      return true;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!validateForm()) return;
  
      try {
        const newDevice = deviceService.addDevice({
          ...formData,
          addedBy: currentUser?.id
        });
  
        setMessage({ type: 'success', text: 'Device added successfully' });
        setFormData({
          name: '',
          os: '',
          version: '',
          serialNumber: '',
          description: ''
        });
      } catch (error) {
        setMessage({ type: 'error', text: error.message || 'Error adding device. Please try again.' });
        console.error('Error adding device:', error);
      }
    };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Device</h1>
      
      {message.text && (
        <div className={`mb-4 p-4 rounded-md flex items-center gap-2 ${
          message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message.type === 'error' ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <Check className="w-5 h-5" />
          )}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Device Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., iPhone 13 Pro"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Operating System</label>
          <input
            type="text"
            name="os"
            value={formData.os}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., iOS"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Version</label>
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 15.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., ABC123XYZ"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            placeholder="Enter device description..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add Device
        </button>
      </form>
    </div>
  );
}