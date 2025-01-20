import { IOwned } from '@/all-types';
import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import { format } from 'date-fns';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const isPositive = (value: number) => {
  return value >= 0 ? true : false;
};

interface ICardInfoProps {
  card: IOwned;
  close: () => void;
  handleDelete: () => void;
}

export const CardInfo = ({ card, close, handleDelete }: ICardInfoProps) => {
  const [cardId, cardType] = card.seen_id.split(':');
  const [_seriesSet, cardNumber] = cardId.split('-');

  const priceChartData = card.prices.map((price) => {
    return {
      date: price.created_at,
      low: price.low,
      mid: price.mid,
      high: price.high,
      market: price.market,
      directLow: price.directLow,
    };
  });

  const cardValue = (card.prices[0].market - card.pricePaid).toFixed(2);

  return (
    <div className="flex flex-col gap-4 bg-slate-900">
      <div className="flex-0 mb-2 flex flex-col border-b-2 border-b-slate-600 pb-2">
        <div className="flex w-full justify-between">
          <div className="mb-4 flex items-baseline gap-2">
            <span>{cardNumber}</span>
            <h2 className="text-2xl">{card.name}</h2>
            <h3>{cardType}</h3>
          </div>
          <button onClick={close}>X</button>
        </div>
        <div className="mb-4 flex justify-between">
          <span>Created at: </span>
          <span>{format(card.created_at, 'MM/dd/yyyy')}</span>
        </div>
        <div
          className={`mb-4 text-2xl font-bold ${classNames({
            'text-green-400': isPositive(parseFloat(cardValue)),
            'text-red-500': !isPositive(parseFloat(cardValue)),
          })}`}
        >
          <span>{isPositive(parseFloat(cardValue)) ? '+' : ''}</span>
          <span>{cardValue}</span>
        </div>
        <div>{card.pricePaid}</div>
        <div className="grid grid-cols-3">
          <img src={card.image} alt={card.name} />
          <ResponsiveContainer className="col-span-2" width="100%" height={400}>
            <LineChart data={priceChartData}>
              <CartesianGrid strokeDasharray={'3 3'} />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), 'MM/dd/yy')} // Format for the date
              />
              <YAxis
                label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
              />
              <Legend />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="low" stroke="#8884d8" name="Low" />
              <Line type="monotone" dataKey="mid" stroke="#82ca9d" name="Mid" />
              <Line
                type="monotone"
                dataKey="high"
                stroke="#ffc658"
                name="High"
              />
              <Line
                type="monotone"
                dataKey="market"
                stroke="#ff7300"
                name="Market"
              />

              <Line
                type="monotone"
                dataKey="directLow"
                stroke="#ff0000"
                name="Direct Low"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3>{card.setSeries}</h3>
          <h3>{card.setName}</h3>
        </div>
        <div>
          <h3>{card.rarity}</h3>
          <div>
            <div>{card.pricePaid}</div>
            <div>{card.prices[0].market}</div>
          </div>
        </div>
      </div>
      <div>
        <Link
          onClick={handleDelete}
          method="delete"
          href={route('owned.destroy', { owned: card.id })}
        >
          Delete
        </Link>
      </div>
    </div>
  );
};
