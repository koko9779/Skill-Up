package Recursion;

/**
 *  최대공약수(Greatest Common Divisor, GCD)
 *  : 두 개 이상의 정수의 공통 약수 중에서 최댓 값
 *
 *  방법 1)
 *  1. A와 B 중에 더 작은 수를 구한다.
 *  2. A, B 두 개가 정확히 나누어 떨어질 때까지 수를 1씩 차감한다.
 *  3. A, B 모두 딱 맞게 나누어 떨어지는 가장 큰 수 리턴
 *
 *  방법 2)
 *  유클리드 호제법
 *  : 두 개의 자연수 A, B 에 대하여 A % B = r 이라고 한다면 (단, A > B)
 *   gcd(A, B) = gcd(B, r) = gcd(C, r') ... 성질을 가지고 있다.
 *   r = 0 이 되면 그 때 나눈 값(B)이 최대공배수다
 *   ex. gcd(1071, 1029) = gcd(1029, 42) = gcd(42,21) = gcd(21, 0) = 21
 */
public class GCD {
    public static int solution1(int A, int B){
        int div;
        // 둘 중에 더 작은 수를 div에 초기화
        if(A > B){
            div = B;
        }else{
            div = A;
        }

        // A와 B 두 개가 div로 나누어 떨어지는 수를 구한다
        while(true){
            if((A % div == 0) && (B % div == 0)){
                return div;
            }
            div --;
        }
    }

    //유클리드 호제법으로 구하는 최대공약수
    public static int solution2(int A, int B){
        int temp;
        // A > B 로 swip
        if(B > A){
            temp = A;
            A = B;
            B = temp;
        }

        if(B == 0) return A;
        return solution2(B, A % B);
    }
}
