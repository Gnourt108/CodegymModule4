package introduction_to_java;

import java.util.Scanner;

public class InLoiChao {
    public static void main(String[] args) {
        System.out.println("Nhập tên của bạn: ");
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        System.out.println("Hello "+name);
    }
}
