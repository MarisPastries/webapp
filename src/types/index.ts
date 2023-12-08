export interface Product {
  id: string;
  title: string;
  imageUrl: string[];
  categoryId: string;
  flavors: string[];
  fillings: string[];
  decorations: string[];
  weights: number[];
  portions: number[];
  prices: number[];
  trending: boolean;
  featured: boolean;
  holiday: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
}