package casestudy_module2.RestaurantManagement.model;

import java.util.HashMap;

public class Restaurant extends Account{
    private String hostRestaurant;
    private double totalRevenue;
    private HashMap<String, Dish> dishes;
    private HashMap<String,Dish> revenueDetail;

    public Restaurant(Integer idUser, String userName, String password, String phoneNumber, String address, boolean isLocked) {
        super(idUser, userName, password, phoneNumber, address, isLocked);
    }

    public Restaurant(Integer idUser, String userName, String password, String phoneNumber, String address, boolean isLocked, String hostRestaurant, double totalRevenue, HashMap<String, Dish> dishes, HashMap<String, Dish> revenueDetail) {
        super(idUser, userName, password, phoneNumber, address, isLocked);
        this.hostRestaurant = hostRestaurant;
        this.totalRevenue = totalRevenue;
        this.dishes = dishes;
        this.revenueDetail = revenueDetail;
    }


    public String getHostRestaurant() {
        return hostRestaurant;
    }

    public void setHostRestaurant(String hostRestaurant) {
        this.hostRestaurant = hostRestaurant;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public HashMap<String, Dish> getDishes() {
        return dishes;
    }

    public void setDishes(HashMap<String, Dish> dishes) {
        this.dishes = dishes;
    }

    public HashMap<String, Dish> getRevenueDetail() {
        return revenueDetail;
    }

    public void setRevenueDetail(HashMap<String, Dish> revenueDetail) {
        this.revenueDetail = revenueDetail;
    }
}
