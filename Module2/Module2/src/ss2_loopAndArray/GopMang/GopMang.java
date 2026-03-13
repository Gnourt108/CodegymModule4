package ss2_loopAndArray.ChenPhanTuVaoMang;

import java.util.Arrays;
import java.util.Scanner;

public class ChenPhanTuVaoMang {
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
        System.out.println("Nhập giá trị cần thêm: ");
        int number = sc.nextInt();
        System.out.println("Nhập vị trí trong mảng: ");
        int index = sc.nextInt();
        if(index < 0 || index > arr.length){
            System.out.println("Không thể chèn được phần tử vào mảng!");
        }else{
            int[] newArr = new int[n+1];
            for (int i = 0, j = 0; i < newArr.length ; i++) {
                if(i == index){
                    newArr[i] = number;
                }else{
                    newArr[i] = arr[j];
                    j++;
                }
            }
            System.out.println("Mảng sau khi chèn là: " + Arrays.toString(newArr));
        }

    }
}
