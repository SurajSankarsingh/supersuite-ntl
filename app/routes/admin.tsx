import { Outlet } from 'remix';

type Props = {};

export default function Admin({}: Props) {
  return (
    <>
      <h1>Admin</h1>
      <Outlet />
    </>
  );
}
