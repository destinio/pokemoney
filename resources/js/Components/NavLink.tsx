import { InertiaLinkProps, Link } from '@inertiajs/react';
import classnames from 'classnames';

export default function NavLink({
  active = false,
  className = '',
  children,
  ...props
}: InertiaLinkProps & { active: boolean }) {
  return (
    <Link
      className={classnames(`hover:text-sky-400`, {
        'text-sky-400': active,
        className: !!className,
      })}
      {...props}
    >
      {children}
    </Link>
  );
}
