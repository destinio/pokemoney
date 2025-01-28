export interface ISetOG {
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
  prices: Record<CardPriceType, IPrices>;
}

export interface IPrice {
  id: number | string;
  low: number | string;
  mid: number | string;
  high: number | string;
  market: number | string;
  direct_low: number | string;
  seen_id: string;
  created_at: string;
  updated_at: string;
}

export interface IPrices {
  low: number;
  mid: number;
  high: number;
  market: number;
  direct_low: number;
}

export interface IOwned {
  cardId: string;
  created_at: string; // ISO 8601 string format for timestamps
  id: number; // auto-incrementing primary key
  image_url: string;
  name: string;
  number: string;
  price_paid: number;
  prices: IPrice[];
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

export interface ISet {
  id: string;
  name: string;
  series_id: number;
  printed_total: number;
  total: number;
  release_date: string;
  symbol_url: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export interface ISeries {
  id: number;
  name: string;
  release_date: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  sets: ISet[];
}
