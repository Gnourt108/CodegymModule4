package casestudy_module2.RestaurantManagement.model;

import java.util.List;

public class Order {
    private Integer orderID;
    private List<Dish> dishes;
    private String status;
    private boolean isPay;

    public Order(Integer orderID, List<Dish> dishes, String status, boolean isPay) {
        this.orderID = orderID;
        this.dishes = dishes;
        this.status = status;
        this.isPay = isPay;
    }

    public Order() {
    }

    public Integer getOrderID() {
        return orderID;
    }

    public void setOrderID(Integer orderID) {
        this.orderID = orderID;
    }

    public List<Dish> getDishes() {
        return dishes;
    }

    public void setDishes(List<Dish> dishes) {
        this.dishes = dishes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isPay() {
        return isPay;
    }

    public void setPay(boolean pay) {
        isPay = pay;
    }
}
