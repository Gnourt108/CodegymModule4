package ss11_DSA_queue_stack.reserveArrayUsingStack;

import common.InputHelper;

import java.util.Arrays;
import java.util.Stack;

public class ReverseArrayUsingStack {
    public static void main(String[] args) {
        int n = InputHelper.inputInt("Nhập số phần tử của mảng: ");
        int[] numbers = new int[n];
        for (int i = 0; i < n; i++) {
            numbers[i] = InputHelper.inputInt("Nhập phần tử thứ: "+(i+1)+" :");
        }
        System.out.println("Mảng ban đầu: "+ Arrays.toString(numbers));

        Stack<Integer> stack = new Stack<>();
        for (int num : numbers){
            stack.push(num);
        }

        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = stack.pop();
        }

        System.out.println("Mảng sau khi đảo ngược: "+Arrays.toString(numbers));

    }
}
