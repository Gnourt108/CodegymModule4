package ss2_loopAndArray.XoaPhanTuKhoiMang;

import java.util.Arrays;
import java.util.Scanner;

public class XoaPhanTuKhoiMang {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Nhập số phần tử trong mảng: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < arr.length; i++) {
            System.out.println("Nhập phần tử thứ "+(i+1)+" :");
            arr[i] = sc.nextInt();
        }
        System.out.println("Mảng bạn vừa nhập là: "+ Arrays.toString(arr));
        System.out.println("Nhập giá trị cần xóa: ");
        int number = sc.nextInt();
        int newLength = 0;
        for (int i = 0; i < n; i++) {
            if(arr[i] != number){
                arr[newLength] = arr[i];
                newLength++;
            }
        }
        if(newLength == n){
            System.out.println("Không tìm thấy phần tử trong mảng!");
        }
        arr = Arrays.copyOf(arr, newLength);
        System.out.println("Mảng sau khi xóa phần tử là: "+Arrays.toString(arr));
    }
}
