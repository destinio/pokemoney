import { CardPriceType, ICard } from '@/all-types';
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
import { Link } from '@inertiajs/react';
import { BaseSyntheticEvent, useState } from 'react';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export function SaveCardForm({ card }: { card: ICard }) {
  const [type, setType] = useState<CardPriceType>(
    () => Object.entries(card.tcgplayer.prices)[0][0] as CardPriceType,
  );

  const [pricePaid, setPricePaid] = useState(0);

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleTypeChange(e: BaseSyntheticEvent) {
    setType(e.target.value);
  }

  function handlePricePaidChange(e: BaseSyntheticEvent) {
    setPricePaid(Number(e.target.value));
  }

  function handleSave() {
    setSaving(true);

    wait().then(() => {
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-green-600 p-1 text-white">
        SAVE
      </DialogTrigger>
      <DialogContent className="bg-slate-950">
        <DialogHeader className="mb-4">
          <DialogTitle className="mb-4 text-xl">
            Save {card.name} {type} to collection?
          </DialogTitle>
          <DialogDescription className="">
            <h2 className="mb-4 text-2xl font-bold text-sky-500">
              You are saving:
            </h2>
            <div className="">
              <div className="flex justify-between">
                <span className="text-lg text-slate-50">Card Name:</span>
                <span className="text-xl font-bold">{card.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg text-slate-50">Type:</span>
                <span className="text-xl font-bold">{type}</span>
              </div>

              <div className="flex justify-between">
                <p className="text-lg text-slate-50">Price Paid:</p>
                <p className="text-xl font-bold">${pricePaid.toFixed(2)}</p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <select onChange={handleTypeChange} className="text-slate-950">
          {Object.keys(card.tcgplayer.prices).map((k, i) => (
            <option
              className="text-slate-950"
              value={k}
              key={`${k}-${card.id}-${i}`}
            >
              {k}
            </option>
          ))}
        </select>
        <input
          className="text-slate-950"
          onChange={handlePricePaidChange}
          name="pricePaid"
          placeholder="price paid"
          type="number"
          defaultValue={0.0}
        />
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <button>Cancel</button>
          </DialogClose>
          <Link
            href={route('owned.store')}
            method="post"
            onClick={handleSave}
            disabled={saving}
            data={{
              name: card.name,
              number: card.number,
              type: type,
              cardId: card.id,
              setId: card.set.id,
              setName: card.set.name,
              setImage: card.set.images.logo,
              setSeries: card.set.series,
              rarity: card.rarity,
              image: card.images.small,
              rawJson: JSON.stringify(card),
              prices: JSON.stringify(card.tcgplayer.prices[type]),
              pricePaid: pricePaid,
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function SaveModal({ card }: { card: ICard }) {
  return <SaveCardForm card={card} />;
}
