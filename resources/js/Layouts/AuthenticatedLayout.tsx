// href={route('logout')}
// <Dropdown.Link href={route('profile.edit')}>
import NavLink from '@/Components/NavLink';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user;

  return (
    <div className="m-auto max-w-screen-md">
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
          <p>-</p>
          <h2>{user.name}</h2>
          <NavLink method="post" active={false} href={route('logout')}>
            logout
          </NavLink>
        </nav>
      </div>

      {header && (
        <header className="">
          <div className="">{header}</div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
