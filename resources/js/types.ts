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
  cardmarket: Cardmarket;
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

interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: {
    [key: string]: Prices;
  };
}

interface Prices {
  reverseHolofoil?: ReverseHolofoil;
  normal?: Normal;
  holofoil?: Holofoil;
}

interface ReverseHolofoil {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

interface Normal {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

interface Holofoil {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
}

interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: Prices2;
}

interface Prices2 {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
}
