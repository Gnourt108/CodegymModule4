package casestudy_module2.RestaurantManagement.model;

public class Dish {
    private Integer idDish;
    private String nameDish;
    private double price;
    private int quality;
    private boolean isEndow;
    private double isDiscount;
    private boolean isBestSeller;
    private long discountDeadline;

    public Dish(Integer idDish, String nameDish, double price, int quality, boolean isEndow, double isDiscount, boolean isBestSeller, long discountDeadline) {
        this.idDish = idDish;
        this.nameDish = nameDish;
        this.price = price;
        this.quality = quality;
        this.isEndow = isEndow;
        this.isDiscount = isDiscount;
        this.isBestSeller = isBestSeller;
        this.discountDeadline = discountDeadline;
    }

    public Dish() {
    }

    public Integer getIdDish() {
        return idDish;
    }

    public void setIdDish(Integer idDish) {
        this.idDish = idDish;
    }

    public String getNameDish() {
        return nameDish;
    }

    public void setNameDish(String nameDish) {
        this.nameDish = nameDish;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuality() {
        return quality;
    }

    public void setQuality(int quality) {
        this.quality = quality;
    }

    public boolean isEndow() {
        return isEndow;
    }

    public void setEndow(boolean endow) {
        isEndow = endow;
    }

    public double getIsDiscount() {
        return isDiscount;
    }

    public void setIsDiscount(double isDiscount) {
        this.isDiscount = isDiscount;
    }

    public boolean isBestSeller() {
        return isBestSeller;
    }

    public void setBestSeller(boolean bestSeller) {
        isBestSeller = bestSeller;
    }

    public long getDiscountDeadline() {
        return discountDeadline;
    }

    public void setDiscountDeadline(long discountDeadline) {
        this.discountDeadline = discountDeadline;
    }
}
