import MainFooter from '@/Components/MainFooter';
import NavLink from '@/Components/NavLink';
import { PropsWithChildren } from 'react';
import { FaHome } from 'react-icons/fa';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="m-auto flex min-h-screen max-w-screen-md flex-col justify-between">
      <div className="flex flex-col px-4">
        <div className="flex justify-between py-8">
          <h1 className="text-2xl font-bold">Poke Card Prices</h1>
          <nav className="flex items-center gap-4 text-2xl">
            <NavLink
              href={route('dashboard')}
              active={route().current('dashboard')}
            >
              <FaHome />
            </NavLink>
          </nav>
        </div>
        <div className="">{children}</div>
        <div className="flex justify-center p-8 text-center">
          <MainFooter />
        </div>
      </div>
    </div>
  );
}
