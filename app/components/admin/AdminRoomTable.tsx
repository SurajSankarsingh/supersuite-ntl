import type { AdminRoomTableProps } from '../types';
import { formatDate } from '~/lib/formatDate';
import { Link } from 'remix';

export default function AdminRoomTable({ rooms }: AdminRoomTableProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr className='text-slate-200'>
            <th>Room #</th>
            <th>Room Name</th>
            <th>Created On</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => {
            const createdOn = formatDate(room.createdAt.toString());

            return (
              <>
                <tr className='hover hover:text-slate-200 ' key={room.id}>
                  <th>{room.room_num}</th>
                  <td>{room.name}</td>
                  <td>{createdOn}</td>
                  <td>
                    <Link to={`/admin/rooms/${room.id}`}>
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
