import { Schema } from 'mongoose';

const MenuItemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  dietaryRestrictions: [String],
  allergens: [String],
});

export const RestaurantSchema = new Schema({
  name: String,
  location: String,
  cuisine: [String],
  dishes: [String],
  menuItems: [MenuItemSchema],
});
