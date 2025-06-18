import React from 'react';
import Header from './Header';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <>
  <Header/>
  <div className="text-center flex flex-col items-center justify-center h-[100vh] bg-gray-900 p-4">
    <h1 className='font-bold text-2xl text-red-500'>{message}</h1>
    <p className='text-lg mt-2 text-white/80'>Try refreshing page again!</p>
  </div>
  </>  
);

export default ErrorMessage;