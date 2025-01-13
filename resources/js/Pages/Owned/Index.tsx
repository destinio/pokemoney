import { IOwned } from '@/all-types';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import OwnedList from './List';

export default function OwnedPage({ ownedCards }: { ownedCards: IOwned[] }) {
  console.log(ownedCards);
  return (
    <Authenticated>
      <OwnedList cards={ownedCards} />
    </Authenticated>
  );
}
