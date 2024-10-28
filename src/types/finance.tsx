import { GasStation, staff_type } from './client';
import { Meter, Product, Pump } from './productType';

export type Discount = {
  station?: string;
  id?: string;
  date: string; // or Date if you prefer
  product: Product | null;
  shift: 'Morning' | 'Evening';
  meter: Meter | null;
  litres: string;
  pump?: Pump | null;
  unit_price: string;
  customer: string;
  amount: string;
  total_amount: string;
};

export type Creditor = {
  id?: string;
  station?: string;
  customer: string;
  address?: string | null;
  company?: string | null;
  contact?: string | null;
  amount?: number | null; // Defaults to 0 if not provided
};

export type CreditSale = {
  id?: string;
  station?: string;
  date: string; // or Date
  creditor: Creditor | null;
  product: Product | null;
  Meter: Meter | null;
  shift: String | null;
  discount?: string | null;
  litres: string;
  unit_price?: String | null;
  pump?: Pump | null;
  agent?: String | null;
  amount?: String;
  discount_amount?: String | null;
  supervisor?: String | null;
};

export type Payment = {
  // station: GasStation;
  date: string; // or Date
  creditor: Creditor;
  agent?: string | null;
  amount_due: number;
  amount: number;
  balance: number;
};

export type ExpenseType = {
  station: string;
  date: string; // or Date
  name: string;
  description?: string | null;
  shift: String | null;
  pump?: Pump | null;
  amount: number;
  agent?: staff_type | null;
};

export type cash_book_type = {
  date: string;
  total_sales: string;
  total_expense: string;
  total_credit: string;
  net_cash: string; // ideally banked amount
  filteredDate? : Date
};
