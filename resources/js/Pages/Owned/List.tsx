import { IOwned } from '@/all-types';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';

import { CardInfo } from '@/Components/CardInfo';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';

interface IOwnedListProps {
  cards: IOwned[];
}

export function OwnedList({ cards: cardsRaw }: IOwnedListProps) {
  const [cards, setCards] = useState<IOwned[]>(() => {
    return cardsRaw;
  });

  const [currentCard, setCurrentCard] = useState<IOwned>(null!);

  if (cards.length === 0) {
    return (
      <div>
        <h2>No cards owned</h2>
      </div>
    );
  }

  const dataToShow = cards.map((card) => {
    const { id, name, created_at, prices, seen_id } = card;
    return { id, name, createdAt: created_at, seenId: seen_id, prices };
  });

  const handleSelectCard = (card: IOwned) => {
    setCurrentCard(card);
  };

  const handleDelete = () => {
    setCards((prev) => {
      return prev.filter((c) => c.id !== currentCard.id);
    });
    setCurrentCard(null!);
  };

  return (
    <>
      <Head title="Set" />

      <div className="">
        <header className="mb-8 flex justify-between">
          <div>Owned Cards</div>
        </header>
        {currentCard ? (
          <CardInfo
            handleDelete={handleDelete}
            close={() => setCurrentCard(null!)}
            card={currentCard}
          />
        ) : null}
        {!currentCard ? (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>id</TableHead>
                  <TableHead>name</TableHead>
                  <TableHead>low</TableHead>
                  <TableHead>mid</TableHead>
                  <TableHead>high</TableHead>
                  <TableHead>market</TableHead>
                  <TableHead>dirctLow</TableHead>
                  <TableHead>data added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataToShow.map((c) => {
                  const { low, mid, high, market, directLow } = c.prices.sort(
                    (a, b) =>
                      new Date(a.created_at).getTime() -
                      new Date(b.created_at).getTime(),
                  )[0];
                  return (
                    <TableRow
                      onClick={() =>
                        handleSelectCard(
                          cards.find((fullCard) => fullCard.id === c.id)!,
                        )
                      }
                      key={c.id}
                    >
                      <TableCell>{String(c.seenId)}</TableCell>
                      <TableCell>{String(c.name)}</TableCell>
                      <TableCell>{String(low)}</TableCell>
                      <TableCell>{String(mid)}</TableCell>
                      <TableCell>{String(high)}</TableCell>
                      <TableCell>{String(market)}</TableCell>
                      <TableCell>{String(directLow)}</TableCell>
                      <TableCell>
                        {String(format(new Date(c.createdAt), 'MM/dd/yyyy'))}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : null}
      </div>
    </>
  );
}
