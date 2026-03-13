package ss13_search.BinarySearch;

import common.InputHelper;

import java.util.Arrays;
import java.util.Scanner;

public class Test {

    public static int binarySearch(int[] array, int left, int right, int value){
        if(left > right){
            return -1;
        }

        int middle = (left + right) / 2;

        if(array[middle] == value){
            return middle;
        }else if(value > array[middle]){
            return binarySearch(array, middle + 1, right, value);
        }else{
            return binarySearch(array, left, middle - 1, value);
        }
    }

    public static void main(String[] args) {
        int n = InputHelper.inputInt("Nhập số lượng phần tử của mảng: ");

        int[] array = new int[n];

        System.out.println("Nhập các phần tử của mảng: ");
        for (int i = 0; i < n; i++) {
            array[i] = InputHelper.inputInt("Nhập phần tử thứ "+(i+1));
        }

        Arrays.sort(array);
        System.out.println("Mảng sau khi sắp xếp là: "+Arrays.toString(array));

        int value = InputHelper.inputInt("Nhập giá trị cần tìm: ");
        int index = binarySearch(array, 0, array.length-1, value);
        if(index != -1){
            System.out.println("Giá trị "+value+" được tìm thấy tại vị trí: "+index);
        }else{
            System.out.println("Không tìm thấy giá trị " + value + " trong mảng");
        }
    }
}
