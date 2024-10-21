import { Meter, Product, Pump } from './productType';

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
  pump? : Pump | null,
  amount?: string; // number
  cash?: string; // number
  credit?: string; // number | null
  creditamount?: string; // number | null
  profit?: string; // number | null
  cost_price?: string; // number | null
  agent: String; // Staff reference
};


export type pump_sales_type = {
  date: string;
  pump : string,
  shift : string,
  total_sales : string
  total_drop : string,
  total_expenses : string,
  total_credit : string,
  total_sales_payment : string,
  short : string,
}
export type sales_payment_type = {
  station? :  string,
  date: string; // string (Date format)
  agent : string,
  supervisor : string,
  shift : string,
  money : string,
  pump : Pump | null,
  transaction_no : string,
  payment_method : string,
}
export type payment_drop_type = {
  station? :  string,
  date: string; // string (Date format)
  agent : string,
  shift : string,
  pump : Pump | null,
  supervisor : string,
  amount : string,
}

export type payment_method_type = {
  station? :  string,
  method : string,
}