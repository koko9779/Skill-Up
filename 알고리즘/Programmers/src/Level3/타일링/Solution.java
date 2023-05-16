package Level3.타일링;
/*
 * 가로의 길이가 n일 경우
 * case1) n - 1 까지 타일이 꽉 차있는 경우
 * 	세로타일 1개만 채울 수 있음
 * case2) n - 2 까지 타일이 꽉 차있는 경우
 * 	세로타일 2개 또는 가로타일 2개 . 두가지 경우지만
 * 	세로타일을 세우는 경우는 case1에 포함됨
 * case3) n - 3 까지 타일이 꽉 차있는 경우
 * 	세로3개. 가로2 세로1 *2
 * 	하지만 모두 case1, case2에 포함됨
 * 
 * => 최종적으로 나오는 점화식
 * F(1) = 1;
 * F(n-3) = (F(n-1) + F(n-2)) * F(1);
 * = 피보나치 수열
 */
public class Solution {
    public int solution(int n) {
        int answer = 0;
        int [] arr = new int[n];
        arr[0] = 1;
        arr[1] = 2;
        for (int i = 2; i < n; i++) {
			int result = arr[i-1] + arr[i-2];
			arr[i] = result % 1000000007;
		}
        return arr[n-1];
    }
}
