package casestudy_module2.RestaurantManagement.model;

import java.util.Map;

public class Cart {
    private Map<String, Dish> items;
    private double totalPrice;

    public Cart(Map<String, Dish> items, double totalPrice) {
        this.items = items;
        this.totalPrice = totalPrice;
    }


}
