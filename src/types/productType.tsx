export type Product = {
  id?: string;
  name: string; // string
  unit_price: string; // number
  station: string;
};

export type Stock = {
  id?: string; // number
  station?: string;
  date: string; // string (Date format)
  product?: Product | null;
  // product_name?: string; // Product reference
  price: string; // number
  litres: string; // number
  Transport: string; // number
  taxes: string; // number
  cost_price?: string; // number
  company: string; // string | null
};

export type Pump = {
  id?: string; // number
  name: string; // string
  station: string; // GasStation reference
};

export type Tank = {
  station?: string;
  id: string; // number
  name: string; // string
  product: Product | null; // Product reference
  capacity: string; // number
  litres: string; // number
  open: string; // number
};

export type TankDipping = {
  station : string,
  id: string; // number
  date: string; // string (Date format)
  Tank: Tank; // Tank reference
  opening?: string; // number
  shift : string,
  closing: string; // number
  expected_sales?: string; // number
  supply?: string; // number
  rtt_litres?: string; // number
  metre_sales?: string; // number
  variance?: string; // number
};

export type Meter = {
  station: string;
  id?: string; // number
  product?: Product | null;
  name: string; // string
  pump: Pump | null; // Pump reference
  tank: Tank | null; // Tank reference
  open?: string; // number
  closing?: string;
};

export type rtt = {
  id: string; // number
  date: string; // string (Date format)
  meter: Meter; // Meter reference
  tank?: string; // Tank reference
  shift: string; // 'Morning' | 'Evening'
  litres: string; // number
  amount?: string; // number
  reason: string; // string | null
};

export type fuelDelivery = {
  station?: string;
  id?: string; // number
  date: string; // string (DateTime format)
  stock: Stock | null; // Stock reference
  tank: Tank | null; // Tank reference
  active?: false; // boolean
  litres_remaining?: string; // number
};
