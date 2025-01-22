import { IOwned } from '@/all-types';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { OwnedList } from './List';

export default function OwnedPage(props: { ownedCards: IOwned[] }) {
  const { ownedCards } = props;

  return (
    <Authenticated>
      <OwnedList cards={ownedCards} />
    </Authenticated>
  );
}
