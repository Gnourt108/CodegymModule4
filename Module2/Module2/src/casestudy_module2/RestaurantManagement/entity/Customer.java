package casestudy_module2.RestaurantManagement.model;

import java.util.HashMap;
import java.util.List;

public class Customer extends Account{

    private String email;
    private List<Order> orders;
    private HashMap<String, Dish> cart;
    private int bankAccountNumber;
    private double currentRevenue;

    public Customer(Integer idUser, String userName, String password, String phoneNumber, String address, boolean isLocked) {
        super(idUser, userName, password, phoneNumber, address, isLocked);
    }

    public Customer(Integer idUser, String userName, String password, String phoneNumber, String address, boolean isLocked, String email, List<Order> orders, HashMap<String, Dish> cart, int bankAccountNumber, double currentRevenue) {
        super(idUser, userName, password, phoneNumber, address, isLocked);
        this.email = email;
        this.orders = orders;
        this.cart = cart;
        this.bankAccountNumber = bankAccountNumber;
        this.currentRevenue = currentRevenue;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public HashMap<String, Dish> getCart() {
        return cart;
    }

    public void setCart(HashMap<String, Dish> cart) {
        this.cart = cart;
    }

    public int getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(int bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public double getCurrentRevenue() {
        return currentRevenue;
    }

    public void setCurrentRevenue(double currentRevenue) {
        this.currentRevenue = currentRevenue;
    }
}
