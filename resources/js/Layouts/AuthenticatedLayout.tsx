// href={route('logout')}
// <Dropdown.Link href={route('profile.edit')}>
import NavLink from '@/Components/NavLink';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  // const user = usePage().props.auth.user;

  return (
    <div className="m-auto flex max-w-screen-md flex-col px-4">
      <div className="flex justify-between py-8">
        <h1>Poke Money</h1>
        <nav className="flex gap-2">
          <NavLink
            href={route('dashboard')}
            active={route().current('dashboard')}
          >
            Dashboard
          </NavLink>
          <NavLink href={route('sets')} active={route().current('sets')}>
            Sets
          </NavLink>
          <NavLink
            href={route('owned.index')}
            active={route().current('owned.index')}
          >
            Owned
          </NavLink>
          <p>-</p>
          <NavLink method="post" active={false} href={route('logout')}>
            logout
          </NavLink>
        </nav>
      </div>

      <main className="flex-1">{children}</main>
    </div>
  );
}
