import { Document } from 'mongoose';

export interface Recipe extends Document {
  name: string;
  ingredients: string[];
  cuisine: string;
  instructions: string;
}
