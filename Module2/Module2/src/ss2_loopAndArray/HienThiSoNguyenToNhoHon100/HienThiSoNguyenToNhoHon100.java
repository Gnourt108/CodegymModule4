package ss2_loopAndArray.InSoNguyenTo;

import java.util.Scanner;

public class InSoNguyenTo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Nhập số lượng số nguyên tố muốn in: ");
        int numbers = sc.nextInt();
        sc.nextLine();
        int count = 0;
        int n = 2;
        String soNguyenTo = "";
        while(count<numbers){
            if(kiemTraSoNguyenTo(n)){
                soNguyenTo += n + " ";
                count++;
            }
            n++;
        }
        System.out.println(numbers+" số nguyên tố đầu tiên là: ");
        System.out.println(soNguyenTo);
    }
    private static boolean kiemTraSoNguyenTo(int number){
        if(number == 2) return true;
        for (int i = 2; i <= Math.sqrt(number) ; i++) {
            if(number % i == 0) return false;
        }
        return true;
    }
}
