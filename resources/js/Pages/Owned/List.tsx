import { ICard, IOwned } from '@/all-types';
import { CardInfo } from '@/Components/CardInfo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/Components/ui/accordion';
import { Input } from '@/Components/ui/input';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';

interface IOwnedListProps {
  cards: IOwned[];
}

export default function OwnedList({ cards: cardsRaw }: IOwnedListProps) {
  const [cards, setCards] = useState<IOwned[]>(() => {
    return cardsRaw;
  });

  const [currentCard, setCurrentCard] = useState<ICard>(null!);
  const [cardOpen, setCardOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null!);

  function handleChangeSearch() {
    const value = searchRef.current.value.replace(/^0+/, '').toLowerCase();

    console.log('number check', !!Number(value));

    if (!!Number(value)) {
      console.log('number search', value);
      setCards(cards.filter((card) => card.number.includes(value)));
      return;
    } else {
      if (value.length <= 2) {
        console.log('reset');
        setCards([]);
        return;
      }
      setCards(cards.filter((card) => card.name.toLowerCase().includes(value)));
    }
  }

  return (
    <>
      {' '}
      <Head title="Set" />
      <div className="">
        <header className="mb-8 flex justify-between">
          <div>Owned Cards</div>
        </header>
        {cards ? (
          <div className="flex flex-col gap-4">
            <div className="">
              <Input
                className="text-slate-900"
                placeholder="Search"
                onChange={handleChangeSearch}
                ref={searchRef}
              />
            </div>
            <Accordion
              style={{
                height: '500px',
              }}
              type="single"
              collapsible
              className="scrollbar-hidden overflow-y-auto"
            >
              {cards.map((c) => {
                return (
                  <AccordionItem value={String(c.id)} key={c.id}>
                    <AccordionTrigger>
                      <div className="flex gap-2">
                        <div className="font-medium text-slate-400">
                          {String(c.number).padStart(3, '0')}
                        </div>
                        <div className="font-bold">{c.name}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex w-full justify-between">
                        <div>{c.seenName}</div>
                        <div>
                          <div>{c.rarity}</div>
                        </div>
                        <img src={c.image} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        ) : null}
        {cards && currentCard && cardOpen ? (
          <CardInfo close={() => setCardOpen(false)} card={currentCard} />
        ) : null}
      </div>
    </>
  );
}

/*
 *
            <Table>
              <TableCaption>List of Set Cards</TableCaption>
              <TableHeader>
                <AccordionItem>
                  <TableHead className="w-[100px]">Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Rarity</TableHead>
                  <TableHead>Normal</TableHead>
                  <TableHead>Holofoil</TableHead>
                  <TableHead>Reverse Holofoil</TableHead>
                  <TableHead>1st Holofoil</TableHead>
                  <TableHead>1st Normal</TableHead>
                </AccordionItem>
              </TableHeader>
 */
