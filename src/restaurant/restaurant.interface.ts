import { Document } from 'mongoose';

export interface Restaurant extends Document {
  name: string;
  location: string;
  cuisine: string[];
  dishes: string[];
  menuItems: MenuItem[];
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  dietaryRestrictions: string[];
  allergens: string[];
}
