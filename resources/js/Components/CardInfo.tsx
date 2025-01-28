import { IOwned } from '@/all-types';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog';
import { Separator } from '@/Components/ui/separator';
import { isPositive } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import { format } from 'date-fns';
import { FaX } from 'react-icons/fa6';
import PricesChart from './PricesChart';

interface ICardInfoProps {
  card: IOwned;
  close: () => void;
  handleDelete: () => void;
}

export const CardInfo = ({ card, close, handleDelete }: ICardInfoProps) => {
  const [cardId, cardType] = card.seen_id.split(':');
  const [_seriesSet, cardNumber] = cardId.split('-');

  const marketPrice = Number(card.prices[0].market || 0);
  const pricePaid = Number(card.price_paid || 0);

  const value = pricePaid - marketPrice;

  return (
    <div className="flex flex-col gap-4 bg-slate-900">
      <div className="flex-0 mb-2 flex flex-col gap-2 pb-2">
        <div className="flex w-full justify-between border-b-2 border-b-slate-600">
          <div className="mb-4 flex items-baseline gap-2">
            <span>{cardNumber}</span>
            <h2 className="text-2xl">{card.name}</h2>
            <h3>{cardType}</h3>
          </div>
          <button className="text-2xl" onClick={close}>
            <FaX />
          </button>
        </div>
        <div className="mb-4 flex justify-between">
          <span>Created at: </span>
          <span>{format(card.created_at, 'MM/dd/yyyy')}</span>
        </div>
        <div
          className={`mb-4 text-2xl font-bold ${classNames({
            'text-green-400': isPositive(value),
            'text-red-500': !isPositive(value),
          })}`}
        >
          <span>{isPositive(value) ? '+' : '-'} </span>
          <span>{value.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
          <img
            className="order-2 md:order-1"
            src={card.image_url}
            alt={card.name}
          />
          <div className="order-1 md:order-2 md:col-span-2">
            <PricesChart priceChartData={card.prices} />
          </div>
        </div>
        <Separator decorative className="my-2" />
        <section>
          <h2>Info:</h2>
          <div>
            <h3>{card.setSeries}</h3>
            <h3>{card.setName}</h3>
          </div>
          <div>
            <h3>{card.rarity}</h3>
          </div>
        </section>
      </div>
      <Dialog>
        <DialogTrigger className="text-red-500">
          delete card from owned
        </DialogTrigger>
        <DialogContent className="bg-slate-950">
          <DialogHeader className="mb-4">
            <DialogTitle className="mb-4">
              Are you want to remove from owned?
            </DialogTitle>
            <DialogDescription>
              This will not impact the card in the database, only your owned
              collection.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <button>Cancel</button>
            </DialogClose>
            <Link
              onClick={handleDelete}
              method="delete"
              className="text-red-500"
              href={route('owned.destroy', { owned: card.id })}
            >
              Delete
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
