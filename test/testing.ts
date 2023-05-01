describe('RestaurantController_class', () => {
  // Tests that the findAll() method returns a list of restaurants.
  it('test_find_all_returns_list_of_restaurants', async () => {
    const restaurantService = new RestaurantService();
    const restaurantController = new RestaurantController(restaurantService);
    const restaurants = await restaurantController.findAll();
    expect(Array.isArray(restaurants)).toBe(true);
  });

  // Tests that the findOne(id) method returns a single restaurant.
  it('test_find_one_returns_single_restaurant', async () => {
    const restaurantService = new RestaurantService();
    const restaurantController = new RestaurantController(restaurantService);
    const restaurant = await restaurantController.findOne('123');
    expect(typeof restaurant).toBe('object');
  });

  // Tests that the create(createRestaurantDto) method throws an error if createRestaurantDto is invalid.
  it('test_create_throws_error_if_invalid_input', async () => {
    const restaurantService = new RestaurantService();
    const restaurantController = new RestaurantController(restaurantService);
    const createRestaurantDto = {
      name: '',
      location: '',
      cuisine: [],
      menuItems: [],
      dietaryRestrictions: [],
    };
    await expect(
      restaurantController.create(createRestaurantDto),
    ).rejects.toThrow();
  });

  // Tests that the update(id, updateRestaurantDto) method returns null if no restaurant is found.
  it('test_update_returns_null_if_no_restaurant_found', async () => {
    const restaurantService = new RestaurantService();
    const restaurantController = new RestaurantController(restaurantService);
    const updateRestaurantDto = {
      name: 'New Name',
      location: 'New Location',
      cuisine: ['New Cuisine'],
      menuItems: [],
    };
    const updatedRestaurant = await restaurantController.update(
      '123',
      updateRestaurantDto,
    );
    expect(updatedRestaurant).toBeNull();
  });

  // Tests that the getRestaurantsByCuisine(cuisine) method throws an error if cuisine is null.
  it('test_get_restaurants_by_cuisine_throws_error_if_cuisine_null', async () => {
    const restaurantService = new RestaurantService();
    const restaurantController = new RestaurantController(restaurantService);
    await expect(
      restaurantController.getRestaurantsByCuisine(null),
    ).rejects.toThrow();
  });

  // Tests that the getRecommendedRestaurantByPrice(budget) method returns a message if no restaurants are found.
  it('test_get_recommended_restaurant_by_price_returns_message_if_no_restaurants_found', async () => {
    const restaurantService = new RestaurantService();
    const restaurantController = new RestaurantController(restaurantService);
    const result = await restaurantController.getRecommendedRestaurantByPrice(
      0,
    );
    expect(result.message).toBe('No encontramos platos según su presupuesto');
  });
});
