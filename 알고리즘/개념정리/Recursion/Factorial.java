package 개념정리.Recursion;

import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int res = factorial(x);
        System.out.println(res);
    }
    public static int factorial(int x){
        if(x == 1) return 1;
        return x * factorial(x - 1);
    }
}
