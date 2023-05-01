import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './restaurant.interface';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().exec();
  }

  async findOne(id: string): Promise<Restaurant> {
    return this.restaurantModel.findById(id).exec();
  }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = new this.restaurantModel(createRestaurantDto);
    return newRestaurant.save();
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantModel
      .findByIdAndUpdate(id, updateRestaurantDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Restaurant> {
    return this.restaurantModel.findByIdAndRemove(id).exec();
  }
  async findByCuisine(cuisines: string[]): Promise<Restaurant[]> {
    return this.restaurantModel.find({ cuisine: { $in: cuisines } }).exec();
  }
  async findByCuisineAndDietaryRestrictions(
    cuisines: string[],
    dietaryRestrictions: string[],
  ): Promise<Restaurant[]> {
    return this.restaurantModel
      .find({
        cuisine: { $in: cuisines },
        'menuItems.dietaryRestrictions': { $in: dietaryRestrictions },
      })
      .exec();
  }
  async findByPrice(budget: number): Promise<Restaurant[]> {
    try {
      const restaurants = await this.restaurantModel.aggregate([
        {
          $match: {
            'menuItems.price': { $lte: budget },
          },
        },
        {
          $addFields: {
            filteredMenuItems: {
              $filter: {
                input: '$menuItems',
                as: 'menuItem',
                cond: { $lte: ['$$menuItem.price', budget] },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            location: 1,
            cuisine: 1,
            dishes: 1,
            filteredMenuItems: 1,
          },
        },
      ]);

      return restaurants.map((restaurant) => ({
        ...restaurant,
        menuItems: restaurant.filteredMenuItems,
      }));
    } catch (error) {
      throw new Error('Error al buscar restaurantes por precio');
    }
  }
}
