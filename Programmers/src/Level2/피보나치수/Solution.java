package Level2.피보나치수;

// 재귀함수를 이용하면 시간초과
// 주의 : 각 피보나치 값에 1234567을 나누라고 한 것

public class Solution {
    public int solution(int n) {
    	int[] arr = new int[n+1];
    	return fibonacci(arr, n);
    }
    public int fibonacci(int[] arr, int n) {
    	arr[0] = 0;
    	arr[1] = 1;
    	arr[2] = arr[0] + arr[1];
    	
    	for (int i = 3; i <= n; i++) {
			arr[i] = arr[i-1] % 1234567 + arr[i-2] % 1234567;
		}
    	return arr[n] % 1234567;
    }
}
