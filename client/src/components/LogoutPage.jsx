import React from 'react';
import { useAuth } from './auth';

export default function LogoutPage() {
  const auth = useAuth();

  const logout = (e) => {
    auth.logout();
  };
  return (
    <>
    <div className='container pt-4'>
      <h1 className='text-bold pb-2'>Sign out</h1>
      <form onSubmit={logout}>
        <h5>Are you sure?</h5>
        <button 
        type="submit"
        className="btn btn-danger mt-2"
        >Sign out</button>
      </form>
      </div>
    </>
  );
}