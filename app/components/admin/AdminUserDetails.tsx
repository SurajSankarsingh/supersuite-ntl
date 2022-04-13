import type { AdminUserDetailsProps } from '../types';

export default function AdminUserDetails({ user }: AdminUserDetailsProps) {
  return (
    <section className='p-8'>
      <div className='container px-5 py-16 mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>User Info:</h1>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>User Name:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{user.username}</span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>User Email:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{user.email}</span>
        </p>
        <p className='text-base leading-relaxed mt-2 justify-between'>
          <b>User Role:</b>{' '}
          <span className='ml-2 text-cyan-500 text-lg'>{user.role}</span>
        </p>
      </div>
    </section>
  );
}
