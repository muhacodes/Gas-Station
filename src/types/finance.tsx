import { GasStation } from "./client";
import { Meter, Product, Pump } from "./productType";

export type Discount = {
    id? : string,
    station?: string;
    date: string; // or Date if you prefer
    product: Product;
    shift: 'Morning' | 'Evening';
    litres: number;
    unit_price: number;
    customer: string;
    amount: number;
    total_amount: number;
};

export type Creditor = {
    id? : string,
    station?: string;
    customer: string;
    address?: string | null;
    company?: string | null;
    contact?: string | null;
    amount?: number | null; // Defaults to 0 if not provided
};

export type CreditSale = {
    id? : string,
    station? : string,
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

export type Expense = {
    // station: GasStation;
    name: string;
    description?: string | null;
    amount: number;
    date: string; // or Date
};