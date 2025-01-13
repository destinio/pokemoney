import { ICard } from './all-types';

export async function saveOwned(card: ICard) {
  alert(`saved card: ${card.id}`);
}
