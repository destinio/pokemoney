import { IOwned } from '@/all-types';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { isPositive } from '@/lib/utils';
import { OwnedList } from './List';

export default function OwnedPage(props: { ownedCards: IOwned[] }) {
  const { ownedCards } = props;

  const paid = ownedCards.reduce((acc, card) => {
    return acc + Number(card.price_paid);
  }, 0);

  const current = ownedCards.reduce((acc, card) => {
    return acc + Number(card.prices[card.prices.length - 1].market);
  }, 0);

  // amout spent vs current value
  // dashboard vs this page

  return (
    <Authenticated>
      <div className="flex justify-between">
        <h2>Total Spent: {paid.toFixed(2)}</h2>
        <h2 className="flex flex-col">
          <span>Total Value:</span>
          <span
            style={{ color: isPositive(current - paid) ? 'green' : 'red' }}
            className="text-3xl font-extrabold"
          >
            {(current - paid).toFixed(2)}
          </span>
        </h2>
        <div>
          <h3>Current Value: {current.toFixed(2)}</h3>
        </div>
      </div>
      <OwnedList cards={ownedCards} />
    </Authenticated>
  );
}
