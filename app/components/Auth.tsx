import { Link } from 'remix';

type Props = {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  } | null;
};

export default function Auth({ user }: Props) {
  return (
    <>
      {user ? (
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} className='m-1 pt-2'>
            <div className=' cursor-pointer font-serif font-semibold text-lg hover:underline'>
              <h2>Hello, {user.username}</h2>
            </div>
          </div>
          {user.role === 'USER' && (
            <ul
              tabIndex={0}
              className='p-2 shadow menu dropdown-content bg-base-content dark:bg-base-200 rounded-box w-52'
            >
              <li>
                <a>User Item 1</a>
              </li>
              <li>
                <a>User Item 2</a>
              </li>
              <li>
                <a>User Item 3</a>
              </li>
              <form action='/api/logout' method='post'>
                <button
                  type='submit'
                  className='flex btn btn-outline btn-accent w-full mt-2'
                >
                  Logout
                </button>
              </form>
            </ul>
          )}
          {user.role === 'ADMIN' && (
            <ul
              tabIndex={0}
              className='p-2 shadow menu dropdown-content bg-base-content dark:bg-base-200 rounded-box w-52'
            >
              <li>
                <a>ADMIN Item 1</a>
              </li>
              <li>
                <a>ADMIN Item 2</a>
              </li>
              <li>
                <a>ADMIN Item 3</a>
              </li>
              <form action='/api/logout' method='post'>
                <button
                  type='submit'
                  className='flex btn btn-outline btn-accent w-full mt-2'
                >
                  Logout
                </button>
              </form>
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
