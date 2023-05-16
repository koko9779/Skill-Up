package Recursion;

import java.util.Scanner;

/**
 * N의 M제곱
 *
 * 문제
 * 재귀함수를 이용하여 제곱을 하는 메소드 power(N,M)을 만들어 보시오
 *
 * 입력예 (N,M)
 * 2 10
 * 10 2
 *
 * 출력예
 * 1024
 * 100
 */
public class NtoMth {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int M = sc.nextInt();

        int res = power(N, M);
        System.out.println(res);
    }
    public static int power(int n, int m){
        if(m == 0){
            return 1;
        }else if(m == 1){
            return n;
        }
        return n * power(n, m - 1);
    }
}
