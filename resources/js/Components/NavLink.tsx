import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
  active = false,
  className = '',
  children,
  ...props
}: InertiaLinkProps & { active: boolean }) {
  return (
    <Link className="hover:text-sky-400" {...props}>
      {children}
    </Link>
  );
}
