import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateMenuItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsString({ each: true })
  dietaryRestrictions: string[];

  @IsArray()
  @IsString({ each: true })
  allergens: string[];
}

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsArray()
  @IsString({ each: true })
  cuisine: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuItemDto)
  menuItems: CreateMenuItemDto[];

  @IsArray()
  @IsString({ each: true })
  dietaryRestrictions: string[];
}
