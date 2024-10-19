const defaultDevices = [
    {
      id: 1,
      name: 'iPhone 12',
      os: 'iOS',
      version: '15.0',
      serialNumber: 'IPHONE12-001',
      available: true,
      borrowedBy: null,
      returnTime: null,
      description: 'Standard iPhone 12 testing device',
      addedAt: new Date().toISOString(),
      addedBy: 'system'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      os: 'Android',
      version: '12',
      serialNumber: 'SAMS21-001',
      available: true,
      borrowedBy: null,
      returnTime: null,
      description: 'Samsung Galaxy S21 for Android testing',
      addedAt: new Date().toISOString(),
      addedBy: 'system'
    },
    {
      id: 3,
      name: 'iPad Pro',
      os: 'iPadOS',
      version: '15.0',
      serialNumber: 'IPADPRO-001',
      available: true,
      borrowedBy: null,
      returnTime: null,
      description: 'iPad Pro for tablet testing',
      addedAt: new Date().toISOString(),
      addedBy: 'system'
    }
  ];
  
  class DeviceService {
    constructor() {
      if (typeof window !== 'undefined') {
        this.initialize();
      }
    }
  
    initialize() {
      const devices = localStorage.getItem('devices');
      if (!devices) {
        localStorage.setItem('devices', JSON.stringify(defaultDevices));
      }
    }
  
    getAllDevices() {
      const devices = localStorage.getItem('devices');
      return devices ? JSON.parse(devices) : [];
    }
  
    addDevice(device) {
      const devices = this.getAllDevices();
      
      // Check for duplicate serial number
      if (devices.some(d => d.serialNumber === device.serialNumber)) {
        throw new Error('A device with this serial number already exists');
      }
  
      const newDevice = {
        ...device,
        id: Date.now(),
        available: true,
        borrowedBy: null,
        returnTime: null,
        addedAt: new Date().toISOString()
      };
  
      devices.push(newDevice);
      localStorage.setItem('devices', JSON.stringify(devices));
      return newDevice;
    }
  
    updateDevice(deviceId, updates) {
      const devices = this.getAllDevices();
      const index = devices.findIndex(d => d.id === deviceId);
      
      if (index === -1) {
        throw new Error('Device not found');
      }
  
      devices[index] = { ...devices[index], ...updates };
      localStorage.setItem('devices', JSON.stringify(devices));
      return devices[index];
    }
  
    deleteDevice(deviceId) {
      const devices = this.getAllDevices();
      const filteredDevices = devices.filter(d => d.id !== deviceId);
      localStorage.setItem('devices', JSON.stringify(filteredDevices));
    }
  
    borrowDevice(deviceId, userId) {
      const devices = this.getAllDevices();
      const device = devices.find(d => d.id === deviceId);
      
      if (!device) {
        throw new Error('Device not found');
      }
      
      if (!device.available) {
        throw new Error('Device is not available');
      }
  
      return this.updateDevice(deviceId, {
        available: false,
        borrowedBy: userId,
        returnTime: new Date().toISOString()
      });
    }
  
    returnDevice(deviceId) {
      return this.updateDevice(deviceId, {
        available: true,
        borrowedBy: null,
        returnTime: null
      });
    }
  
    resetToDefault() {
      localStorage.setItem('devices', JSON.stringify(defaultDevices));
      return defaultDevices;
    }
  }
  
  export const deviceService = new DeviceService();