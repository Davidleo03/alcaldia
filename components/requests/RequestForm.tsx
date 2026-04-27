'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RequestCategory, RequestPriority } from '@/lib/types';

export function RequestForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'pothole' as RequestCategory,
    priority: 'medium' as RequestPriority,
    location: '',
    latitude: 40.7128,
    longitude: -74.006,
    submittedBy: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const categories: { value: RequestCategory; label: string }[] = [
    { value: 'road_repair', label: 'Road Repair' },
    { value: 'streetlight', label: 'Streetlight' },
    { value: 'pothole', label: 'Pothole' },
    { value: 'sidewalk', label: 'Sidewalk' },
    { value: 'drainage', label: 'Drainage' },
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'other', label: 'Other' },
  ];

  const priorities: { value: RequestPriority; label: string }[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send the data to a backend
    console.log('Form submitted:', formData);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/requests">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Requests
        </Button>
      </Link>

      {submitted ? (
        // Success Message
        <Card className="p-8 bg-green-50 border-green-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              Request Submitted Successfully
            </h2>
            <p className="text-green-700 mb-6">
              Your service request has been submitted and will be reviewed shortly.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-green-600">
                <span className="font-semibold">Request ID:</span> REQ-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <Link href="/requests">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  View All Requests
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    title: '',
                    description: '',
                    category: 'pothole',
                    priority: 'medium',
                    location: '',
                    latitude: 40.7128,
                    longitude: -74.006,
                    submittedBy: '',
                    notes: '',
                  });
                }}
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Submit a Request</h1>
            <p className="text-gray-600 mt-1">
              Report a municipal service issue that needs attention
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Information</h2>
              
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Brief title of the issue"
                    required
                    className="border-gray-300"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed description of the issue"
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {priorities.map((pri) => (
                      <option key={pri.value} value={pri.value}>
                        {pri.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Location Section */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
              
              <div className="space-y-4">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Street address or intersection"
                    required
                    className="border-gray-300"
                  />
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Latitude
                    </label>
                    <Input
                      type="number"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="40.7128"
                      step="0.0001"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Longitude
                    </label>
                    <Input
                      type="number"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="-74.0060"
                      step="0.0001"
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Section */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name <span className="text-red-600">*</span>
                </label>
                <Input
                  type="text"
                  name="submittedBy"
                  value={formData.submittedBy}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="border-gray-300"
                />
              </div>
            </Card>

            {/* Additional Notes */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional details that might be helpful"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Submit Request
              </Button>
              <Link href="/requests" className="flex-1">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
