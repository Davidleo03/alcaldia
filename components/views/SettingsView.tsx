'use client';

import { useState } from 'react';
import { Bell, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function SettingsView() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    requestUpdates: true,
    dailyDigest: false,
  });

  const [profile, setProfile] = useState({
    name: 'John Administrator',
    email: 'john@municipal.gov',
    phone: '(555) 123-4567',
    department: 'Operations',
  });

  const handleSettingChange = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account preferences and system settings
        </p>
      </div>

      {/* Profile Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              className="border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              name="department"
              value={profile.department}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option>Operations</option>
              <option>Maintenance</option>
              <option>Administration</option>
              <option>Planning</option>
            </select>
          </div>

          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Notifications Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              key: 'emailNotifications',
              label: 'Email Notifications',
              description: 'Receive updates via email',
            },
            {
              key: 'smsNotifications',
              label: 'SMS Notifications',
              description: 'Receive updates via text message',
            },
            {
              key: 'requestUpdates',
              label: 'Request Updates',
              description: 'Get notified when requests are updated',
            },
            {
              key: 'dailyDigest',
              label: 'Daily Digest',
              description: 'Receive a daily summary of activity',
            },
          ].map(({ key, label, description }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <button
                onClick={() => handleSettingChange(key)}
                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                  settings[key as keyof typeof settings]
                    ? 'bg-red-600'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[key as keyof typeof settings]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Last password change: January 15, 2024
          </p>
          <Button variant="outline">
            Change Password
          </Button>
        </div>
      </Card>
    </div>
  );
}
