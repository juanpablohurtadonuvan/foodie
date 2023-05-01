import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jhurtadon:n7chrMvcn9mtEWBl@cluster0.xpmwenx.mongodb.net/?retryWrites=true&w=majority',
    ),
    RestaurantModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
