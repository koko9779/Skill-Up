package Recursion;

/**
 * 0과 1부터 시작해서 앞에 있는 두 수를 더한 값을 다음 값으로 추가
 * 0, 1, 2, 3, 5, 8 ...
 *
 * 0 + 1 = 1,
 * 1 + 1 = 2,
 * 1 + 2 = 3,
 * 2 + 3 = 5,
 * 3 + 5 = 8
 */
public class FibonacciSequence {
    public static int Fibonacci(int x){
        if(x == 0) return 0;
        else if(x == 1) return 1;
        else return Fibonacci(x - 1) + Fibonacci(x - 2);
    }
}
