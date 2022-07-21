import React from 'react';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();
  // console.warn(user);
  return (
    <div>
      <User
        image={user.photoURL}
        email={user.email}
        name={user.displayName}
        lastLogin={user.metadata.lastSignInTime}
      />
    </div>
  );
}
