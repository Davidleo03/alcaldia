'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, User, FileText, MapPinIcon, Edit2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Request } from '@/lib/types';
import { RequestStatusBadge } from './RequestStatusBadge';
import { RequestPriorityBadge } from './RequestPriorityBadge';

interface RequestDetailProps {
  request: Request;
}

export function RequestDetail({ request }: RequestDetailProps) {
  const categoryLabels: Record<string, string> = {
    road_repair: 'Road Repair',
    streetlight: 'Streetlight',
    pothole: 'Pothole',
    sidewalk: 'Sidewalk',
    drainage: 'Drainage',
    landscaping: 'Landscaping',
    other: 'Other',
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

      {/* Header Card */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-red-100 border-red-200">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{request.title}</h1>
            <p className="text-gray-700 mb-4">{request.description}</p>
            <div className="flex flex-wrap gap-2">
              <RequestStatusBadge status={request.status} />
              <RequestPriorityBadge priority={request.priority} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-600">Request ID</p>
            <p className="text-2xl font-bold text-red-600">{request.id}</p>
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          {request.imageUrl && (
            <Card className="overflow-hidden">
              <div className="relative w-full h-80">
                <Image
                  src={request.imageUrl}
                  alt={request.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          )}

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Category</p>
                <p className="text-gray-900 mt-1">
                  {categoryLabels[request.category]}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Description</p>
                <p className="text-gray-900 mt-1">{request.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Notes</p>
                <p className="text-gray-900 mt-1 whitespace-pre-wrap">{request.notes}</p>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-12 bg-red-600 rounded-full flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Submitted</p>
                  <p className="text-sm text-gray-600">
                    {new Date(request.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-12 bg-yellow-400 rounded-full flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Last Updated</p>
                  <p className="text-sm text-gray-600">
                    {new Date(request.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {request.estimatedCompletion && (
                <div className="flex gap-4">
                  <div className="w-2 h-12 bg-purple-600 rounded-full flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Estimated Completion</p>
                    <p className="text-sm text-gray-600">
                      {new Date(request.estimatedCompletion).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Information */}
        <div className="space-y-6">
          {/* Location Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{request.location}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Lat: {request.latitude.toFixed(4)} | Lon: {request.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Submitter Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitter</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">{request.submittedBy}</p>
                  <p className="text-xs text-gray-600">Submitted on {new Date(request.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Status Card */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
            <div className="space-y-3">
              <RequestStatusBadge status={request.status} />
              <div className="pt-3 border-t border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Priority Level</p>
                <RequestPriorityBadge priority={request.priority} />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Request
            </Button>
            <Button variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Print Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
