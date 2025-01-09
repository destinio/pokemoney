import { ISet } from '@/hooks/useSets';
import { Link } from '@inertiajs/react';

export function SetCard({ set }: { set: ISet }) {
  return (
    <div className="border-2 border-sky-300 p-2 text-2xl text-sky-100 hover:border-sky-300 focus:border-sky-300">
      {set.name}
      <Link href={`/set/${set.id}`}>link: {set.id}</Link>
    </div>
  );
}
