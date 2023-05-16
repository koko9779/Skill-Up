package 개념정리.Recursion;

import java.util.Scanner;

/**
 * 소인수분해
 *
 * 백준 11653번 문제
 * 정수 N이 주어졌을 때, 소인수분해하는 프로그램을 작성하시오.
 *
 * 입력예
 * 72
 *
 * 출력예
 * 2
 * 2
 * 2
 * 3
 * 3
 *
 * 핵심 원리
 * N이 두개 이상의 곱셈(인수)으로 나타낼 수 있을 때 인수 중 한 개 이상은 반드시 √N보다 작거나 같다.
 * 즉, 반복문의 범위 : 2 ~ √N
 * ex. N = 16 라면, √16 = 4. 소인수분해를 4까지만 진행하면 됨
 *     N = 34 라면, √34 = 약 5.83. 소인수분해를 5까지만 반복.
 *
 * 이 원리를 이용하면 2 ~ N 까지 모든 수를 나눠볼 필요없이 좀 더 효율적인 코드를 만들 수 있다.
 */
public class Factorization {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        factorization(N);
    }
    public static void factorization(int N){
        for (int i = 2; i <= Math.sqrt(N); i++){
            while(N % i == 0){
                System.out.println(i);
                N /= i;
            }
        }

        if(N != 1){
            System.out.println(N);
        }
    }
}
