import type { AdminUserTableProps } from '../types';
import { formatDate } from '~/lib/formatDate';
import { Link } from '@remix-run/react';

export default function AdminRoomTable({ users }: AdminUserTableProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr className='text-slate-200'>
            <th></th>
            <th>User Name</th>
            <th>User Email</th>
            <th>user Role</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const createdOn = formatDate(user.createdAt.toString());

            return (
              <>
                <tr className='hover text-slate-200 ' key={user.id}>
                  <th>
                    <Link to={`/admin/users/${user.id}`}>
                      <span className='mr-4 uppercase text-sm'>Details</span>
                      <i className='fa-solid fa-angle-right text-cyan-500'></i>
                    </Link>
                  </th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{createdOn}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
