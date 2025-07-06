import React from 'react';
import Modal from '../ui/Modal';
import type { User } from '../../types/types';

interface UserProfileProps {
  user: User;
  onClose: () => void;
}

export default function UserProfile({ user, onClose }: UserProfileProps) {
  return (
    <Modal isOpen={true} onClose={onClose} title="User Profile">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Phone:</span>
            <span className="text-gray-900">{user.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Website:</span>
            <span className="text-gray-900">{user.website}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Company:</span>
            <span className="text-gray-900">{user.company.name}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}