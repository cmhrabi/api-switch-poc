// The only shapes the UI layer knows about. Both adapters must produce exactly these.

export interface Price {
  amount: number;
  currency: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: Price;
  category: Category;
}
