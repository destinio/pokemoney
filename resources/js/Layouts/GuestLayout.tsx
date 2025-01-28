import NavLink from '@/Components/NavLink';
import { PropsWithChildren } from 'react';
import { FaHome } from 'react-icons/fa';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="m-auto flex max-w-screen-md flex-col px-4">
      <div className="flex justify-between py-8">
        <h1 className="text-2xl font-bold">Poke Card Prices</h1>
        <nav className="flex items-center gap-4 text-2xl">
          <NavLink
            href={route('dashboard')}
            active={route().current('dashboard')}
          >
            <FaHome />
          </NavLink>
          {/* <NavLink */}
          {/*   href={route('series.index')} */}
          {/*   active={route().current('series')} */}
          {/* > */}
          {/*   <FaSearch /> */}
          {/* </NavLink> */}
          {/* <NavLink */}
          {/*   href={route('owned.index')} */}
          {/*   active={route().current('owned.index')} */}
          {/* > */}
          {/*   <TbCardsFilled /> */}
          {/* </NavLink> */}
          {/* <NavLink method="post" active={false} href={route('logout')}> */}
          {/*   <FaPowerOff /> */}
          {/* </NavLink> */}
        </nav>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
