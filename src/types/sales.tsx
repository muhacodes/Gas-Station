import { Meter, Product } from './productType';

export type sales = {
  station? : string,
  id?: string; // number
  product? : Product;
  date: string; // string (Date format)
  shift: string; // 'Morning' | 'Evening'
  Meter: Meter | null; // Meter reference
  opening?: string; // number
  closing: string; // number
  litres?: string; // number | null
  unit_price?: string; // number
  difference?: string; // number | null
  rtt_litres?: string; // number | null
  rtt_amount?: string; // number | null
  amount?: string; // number
  cash?: string; // number
  credit?: string; // number | null
  creditamount?: string; // number | null
  profit?: string; // number | null
  cost_price?: string; // number | null
  agent: String; // Staff reference
};
