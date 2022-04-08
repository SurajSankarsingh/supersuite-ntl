import type { Room } from '@prisma/client';
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'remix';
import invariant from 'tiny-invariant';
import AdminRoomDetails from '~/components/admin/AdminRoomDetails';
import { deleteRoom } from '~/utils/mutations.server';
import { getRoomById } from '~/utils/queries.server';

type LoaderData = {
  room: Room;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { roomId } = params;

  invariant(roomId, 'Expected roomId');

  const room = await getRoomById(roomId);
  if (!room) throw new Error('Room not found');

  const data: LoaderData = { room };

  return data;
};

export const action: ActionFunction = async ({ params }) => {
  const { roomId } = params;
  invariant(roomId, 'Expected roomId');

  await deleteRoom(roomId);

  return redirect('/admin/rooms');
};

export default function AdminRooms() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <AdminRoomDetails room={data.room} />
      <div className='flex flex-row justify-center'>
        <Link to='/admin/rooms' className='btn btn-outline btn-accent mr-4'>
          Back to Rooms Table
        </Link>
        <Form method='post'>
          <button type='submit' className='btn btn-outline btn-error'>
            Delete Room
          </button>
        </Form>
      </div>
    </>
  );
}
