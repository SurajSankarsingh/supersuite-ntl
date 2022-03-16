import { Outlet } from 'remix';

type Props = {};

export default function Me({}: Props) {
  return (
    <>
      <h1>User Pages</h1>
      <Outlet />
    </>
  );
}
