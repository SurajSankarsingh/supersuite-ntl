import type { AdminBookingTableProps } from '../types';
import { formatDate } from '~/lib/formatDate';
import { Link } from 'remix';

export default function BookingTable({ bookings }: AdminBookingTableProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full table-normal'>
        <thead>
          <tr className='text-slate-200'>
            <th></th>
            <th>Room #</th>
            <th>Room Name</th>
            <th>User Name</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const checkInDate = formatDate(booking.checkInDate);
            const checkOutDate = formatDate(booking.checkOutDate);

            return (
              <>
                <tr className='hover hover:text-slate-200 ' key={booking.id}>
                  <th className=' bg-slate-200 dark:bg-slate-900'>
                    <Link to={`/admin/bookings/${booking.id}`}>
                      <span className='mr-4 uppercase text-sm'>Details</span>
                      <i className='fa-solid fa-angle-right text-cyan-500'></i>
                    </Link>
                  </th>
                  <td>{booking.room.room_num}</td>
                  <td>{booking.room.name}</td>
                  <td>{booking.user.username}</td>
                  <td>{checkInDate}</td>
                  <td>{checkOutDate}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
