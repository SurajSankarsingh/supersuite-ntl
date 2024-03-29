import type { AdminRoomTableProps } from '../types';
import { formatDate } from '~/lib/formatDate';
import { Link } from '@remix-run/react';

export default function AdminRoomTable({ rooms }: AdminRoomTableProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr className='text-slate-200'>
            <th></th>
            <th>Room #</th>
            <th>Room Name</th>
            <th>Created On</th>
            <th>Price Per Night</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => {
            const createdOn = formatDate(room.createdAt.toString());

            return (
              <>
                <tr className='hover text-slate-200 ' key={room.id}>
                  <th>
                    <Link to={`/admin/rooms/${room.id}`}>
                      <span className='mr-4 uppercase text-sm'>Details</span>
                      <i className='fa-solid fa-angle-right text-cyan-500'></i>
                    </Link>
                  </th>
                  <td>{room.room_num}</td>
                  <td>{room.name}</td>
                  <td>{createdOn}</td>
                  <td>$ {room.price_per_night}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
