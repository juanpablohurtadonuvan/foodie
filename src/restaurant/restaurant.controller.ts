import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './restaurant.interface';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  findAll(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.findOne(id);
  }

  @Post()
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.delete(id);
  }

  @Post('/recommendationsByCuisine')
  async getRecommendedRestaurant(
    @Body('favoriteCuisines') favoriteCuisines: string[],
    @Body('dietaryRestrictions') dietaryRestrictions: string[],
  ): Promise<{ restaurants: Restaurant[]; option: string }> {
    // Validar si se proporcionaron preferencias de cocina
    if (!favoriteCuisines || favoriteCuisines.length === 0) {
      throw new HttpException(
        'Debe proporcionar al menos una preferencia de cocina',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      let restaurants: Restaurant[];

      if (dietaryRestrictions && dietaryRestrictions.length > 0) {
        // Obtener los restaurantes que coincidan con las preferencias de cocina y restricciones dietéticas
        restaurants =
          await this.restaurantService.findByCuisineAndDietaryRestrictions(
            favoriteCuisines,
            dietaryRestrictions,
          );
      } else {
        // Obtener todos los restaurantes que coincidan con las preferencias de cocina
        restaurants = await this.restaurantService.findByCuisine(
          favoriteCuisines,
        );
      }

      // Verificar si se encontraron restaurantes
      if (restaurants.length === 0) {
        const cuisineType = favoriteCuisines.join(', ');
        return {
          restaurants: [],
          option: `No existen restaurantes de tipo ${cuisineType} en el sistema`,
        };
      }

      const option = restaurants.length > 1 ? 'Mejor' : 'Única opción';

      // Retornar los restaurantes y la opción
      return { restaurants, option };
    } catch (error) {
      console.error(error); // Registrar el error en la consola
      if (error instanceof HttpException) {
        throw error; // Propagar la excepción HttpException tal como está
      } else {
        throw new HttpException(
          'Ocurrió un error al obtener los restaurantes recomendados',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('/getRestaurantsByCuisine')
  async getRestaurantsByCuisine(
    @Body('cuisine') cuisine: string,
  ): Promise<{ total: number; restaurants: Restaurant[] }> {
    if (!cuisine) {
      throw new HttpException(
        'Debe proporcionar la cocina',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const restaurants = await this.restaurantService.findByCuisine([cuisine]);

      if (restaurants.length === 0) {
        throw new HttpException(
          `No existen restaurantes de tipo ${cuisine} en el sistema`,
          HttpStatus.NOT_FOUND,
        );
      }

      return { total: restaurants.length, restaurants };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Ocurrió un error al obtener los restaurantes',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  @Post('/recommendationsByPrice')
  async getRecommendedRestaurantByPrice(
    @Body('budget') budget: number,
  ): Promise<{ restaurants?: Restaurant[]; message: string }> {
    if (!budget) {
      throw new HttpException(
        'Debe proporcionar el presupuesto',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const restaurants = await this.restaurantService.findByPrice(budget);

      if (restaurants.length === 0) {
        return {
          message: 'No encontramos platos según su presupuesto',
        };
      }

      return {
        message: `Se han encontrado ${restaurants.length} restaurantes!`,
        restaurants,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Ocurrió un error al obtener los restaurantes recomendados',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
