import { Form, Link, NavLink } from 'remix';
import type { UserProps } from '~/components/types';

export default function Auth({ user }: UserProps) {
  return (
    <>
      {user ? (
        <div className='dropdown dropdown-end dropdown-hover'>
          <div tabIndex={0} className='m-1 pt-2'>
            <div className='cursor-pointer font-serif font-semibold text-lg'>
              <h2>Hello, {user.username}</h2>
            </div>
          </div>
          {user.role === 'USER' && (
            <ul
              tabIndex={0}
              className='p-2 shadow menu dropdown-content dark:bg-base-200 bg-base-content rounded-box w-52'
            >
              <li className='hover-bordered bordered '>
                <NavLink to='me/profile'>My Profile</NavLink>
              </li>
              <li className='hover-bordered bordered'>
                <NavLink to='me/bookings'>My Bookings</NavLink>
              </li>
              <Form action='/api/logout' method='post'>
                <button
                  type='submit'
                  className='flex btn btn-outline btn-accent w-full mt-2'
                >
                  Logout
                </button>
              </Form>
            </ul>
          )}
          {user.role === 'ADMIN' && (
            <ul
              tabIndex={0}
              className='p-2 shadow menu dropdown-content bg-base-content dark:bg-base-200 rounded-box w-52'
            >
              <li className='hover-bordered bordered'>
                <NavLink to='admin/rooms'>Rooms</NavLink>
              </li>
              <li className='hover-bordered bordered'>
                <NavLink to='admin/bookings'>Bookings</NavLink>
              </li>
              <li className='hover-bordered bordered'>
                <NavLink to='admin/users'>Users</NavLink>
              </li>
              <Form action='/api/logout' method='post'>
                <button
                  type='submit'
                  className='flex btn btn-outline btn-accent w-full mt-2'
                >
                  Logout
                </button>
              </Form>
            </ul>
          )}
        </div>
      ) : (
        <Link to='/login' className='btn btn-outline btn-accent'>
          Login
        </Link>
      )}
    </>
  );
}
