import { ICard, ISetOG } from './all-types';

interface ISetsReturn {
  name: string;
  sets: ISetOG[];
}

export async function getSets(): Promise<ISetsReturn[]> {
  const res = await fetch('https://api.pokemontcg.io/v2/sets');
  const data = (await res.json()) as { data: ISetOG[] };

  const newData = Object.entries(
    data.data.reduce(
      (p, c) => {
        if (c.series in p) {
          p[c.series].push(c);
        } else {
          p[c.series] = [c];
        }

        return p;
      },
      {} as Record<string, ISetOG[]>,
    ),
  ).map((series) => {
    return {
      name: series[0],
      sets: series[1],
    };
  });

  return newData;
}

export async function getSet(id: string): Promise<ICard[]> {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${id}`);
  const data = await res.json();

  return data.data as ICard[];
}

export async function getCard(id: string): Promise<ICard> {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
  const data = await res.json();

  return data.data as ICard;
}
