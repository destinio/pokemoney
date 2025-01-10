import { ICard } from '@/all-types';

interface ICardInfoProps {
  card: ICard;
  close: () => void;
}
export const CardInfo = ({ card, close }: ICardInfoProps) => {
  return (
    <div className="fixed right-0 top-0 h-screen w-96 border-l-2 p-4">
      <div className="flex flex-col gap-4">
        <header className="flex justify-between">
          <h2 className="text-2xl font-bold">{card.name}</h2>
          <button onClick={() => close()}>X</button>
        </header>
        <section>
          <img src={card.images.small} className="w-full" />
        </section>
      </div>
    </div>
  );
};
