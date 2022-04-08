import type { AdminUserTableProps } from '../types';
import { formatDate } from '~/lib/formatDate';
import { Link } from 'remix';

export default function AdminRoomTable({ users }: AdminUserTableProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr className='text-slate-200'>
            <th>User Name</th>
            <th>User Email</th>
            <th>user Role</th>
            <th>Created On</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const createdOn = formatDate(user.createdAt.toString());

            return (
              <>
                <tr className='hover hover:text-slate-200 ' key={user.id}>
                  <th>{user.username}</th>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{createdOn}</td>
                  <td>
                    <Link to={`/admin/users/${user.id}`}>
                      <span className='mr-4 uppercase text-sm'>Details</span>
                      <i className='fa-solid fa-angle-right text-cyan-500'></i>
                    </Link>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
