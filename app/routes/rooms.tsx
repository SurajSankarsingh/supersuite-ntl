import { Outlet } from '@remix-run/react';

export default function Rooms() {
  return (
    <>
      <div className='flex flex-row justify-end items-center p-6'></div>
      <Outlet />
    </>
  );
}
