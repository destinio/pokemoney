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
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesTo?: string[];
  attacks: Attack[];
  weaknesses: Weakness[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities2;
  regulationMark: string;
  images: Images2;
  tcgplayer: Tcgplayer;
  evolvesFrom?: string;
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

export interface Prices {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
}

export interface IOwned {
  id: number; // auto-incrementing primary key
  created_at: string; // ISO 8601 string format for timestamps
  updated_at: string; // ISO 8601 string format for timestamps
  name: string;
  number: string;
  cardId: string;
  image: string;
  setId: string;
  setName: string;
  setImage: string; // added based on your migration
  setSeries: string;
  rarity: string;
  rawJson: object; // JSON object, could be any complex structure
  user_id: number; // foreign key to the users table
}

export type CardPriceType =
  | 'normal'
  | 'holofoil'
  | 'reverseHolofoil'
  | '1stEditionHolofoil'
  | '1stEditionNormal';
