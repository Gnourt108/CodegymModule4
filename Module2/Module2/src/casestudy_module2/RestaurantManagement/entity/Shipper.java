package casestudy_module2.RestaurantManagement.model;

import java.util.List;

public class Shipper extends Account{
    private boolean isBusy;
    private String carType;
    private List<Order> orders;
    protected boolean isLocked;
    private List<Order> deliveryOrders;

    public Shipper(Integer idUser, String userName, String password, String phoneNumber, String address, boolean isLocked, boolean isBusy, String carType, List<Order> orders, boolean isLocked1, List<Order> deliveryOrders) {
        super(idUser, userName, password, phoneNumber, address, isLocked);
        this.isBusy = isBusy;
        this.carType = carType;
        this.orders = orders;
        this.isLocked = isLocked1;
        this.deliveryOrders = deliveryOrders;
    }

    public boolean isBusy() {
        return isBusy;
    }

    public void setBusy(boolean busy) {
        isBusy = busy;
    }

    public String getCarType() {
        return carType;
    }

    public void setCarType(String carType) {
        this.carType = carType;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    @Override
    public boolean isLocked() {
        return isLocked;
    }

    @Override
    public void setLocked(boolean locked) {
        isLocked = locked;
    }

    public List<Order> getDeliveryOrders() {
        return deliveryOrders;
    }

    public void setDeliveryOrders(List<Order> deliveryOrders) {
        this.deliveryOrders = deliveryOrders;
    }
}
