import { ISet } from '@/all-types';
import { Link } from '@inertiajs/react';

export function SetCard({ set }: { set: ISet }) {
  return (
    <div className="">
      <Link href={`/set/${set.id}`}>
        <img className="h-16" src={`${set.images.logo}`} />
      </Link>
    </div>
  );
}
