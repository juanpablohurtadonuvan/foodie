import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredients?: string[];

  @IsOptional()
  @IsString()
  cuisine?: string;

  @IsOptional()
  @IsString()
  instructions?: string;
}
