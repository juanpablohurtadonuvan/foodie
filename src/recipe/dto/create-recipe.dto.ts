import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsNotEmpty()
  @IsString()
  cuisine: string;

  @IsNotEmpty()
  @IsString()
  instructions: string;
}
