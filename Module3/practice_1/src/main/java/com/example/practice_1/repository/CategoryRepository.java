package com.example.practice_1.repository;

import com.example.practice_1.entity.ProductType;
import com.example.practice_1.util.ConnectDB;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProductTypeRepository implements IProductTypeRepository {
    private final String FIND_ALL = "select * from product_types";
    @Override
    public List<ProductType> findAll() {
        List<ProductType> productTypes = new ArrayList<>();
        try (Connection connection = ConnectDB.getConnectDB();
             PreparedStatement ps = connection.prepareStatement(FIND_ALL)){
            ResultSet rs = ps.executeQuery();
            while (rs.next()){
                int id = rs.getInt("id");
                String name = rs.getString("name");
                productTypes.add(new ProductType(id, name));
            }
        }catch (SQLException e){
            e.printStackTrace();
            System.out.println("Lỗi kết nối DB");
        }
        return productTypes;
    }
}
