import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipeDocument = Recipe & Document;

export const RecipeModel = 'Recipe';

@Schema()
export class Recipe {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  ingredients: string[];

  @Prop({ required: true })
  steps: string[];

  @Prop({ required: true })
  category: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
