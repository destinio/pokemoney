export interface ISet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: Images;
}

export interface ICard {
  artist: string;
  attacks: Attack[];
  convertedRetreatCost: number;
  evolvesFrom?: string;
  evolvesTo?: string[];
  flavorText: string;
  hp: string;
  id: string;
  images: Images2;
  legalities: Legalities2;
  name: string;
  nationalPokedexNumbers: number[];
  number: string;
  rarity: string;
  regulationMark: string;
  retreatCost: string[];
  set: Set;
  subtypes: string[];
  supertype: string;
  tcgplayer: Tcgplayer;
  types: string[];
  weaknesses: Weakness[];
}

interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Weakness {
  type: string;
  value: string;
}

interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: Images;
}

interface Legalities {
  unlimited: string;
  standard: string;
  expanded: string;
}

interface Images {
  symbol: string;
  logo: string;
}

interface Legalities2 {
  unlimited: string;
  standard: string;
  expanded: string;
}

interface Images2 {
  small: string;
  large: string;
}

export interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: Record<CardPriceType, Prices>;
}

export interface IPrice {
  id: number;
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
  seen_id: string;
  created_at: string;
  updated_at: string;
}

export interface Prices {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
}

export interface IOwned {
  cardId: string;
  created_at: string; // ISO 8601 string format for timestamps
  id: number; // auto-incrementing primary key
  image: string;
  name: string;
  number: string;
  pricePaid: number;
  prices: IPrice[]; // TODO: Change out for new IPrice
  rarity: string;
  rawJson: object; // JSON object, could be any complex structure
  seenName: string;
  seen_id: string;
  setId: string;
  setImage: string; // added based on your migration
  setName: string;
  setSeries: string;
  updated_at: string; // ISO 8601 string format for timestamps
  user_id: number; // foreign key to the users table
}

export type CardPriceType =
  | 'normal'
  | 'holofoil'
  | 'reverseHolofoil'
  | '1stEditionHolofoil'
  | '1stEditionNormal';
