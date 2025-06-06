import React from 'react';
import { useSelector } from 'react-redux';
import Friend from './Friend';

export default function FriendMain () {
  const user = useSelector(state => state.auth.account);

  return (
    <div className="Friends">
      {user && user.friends.map(x => (
        <Friend key={x.id} data={x.friend} />
      ))}
    </div>
  );
};