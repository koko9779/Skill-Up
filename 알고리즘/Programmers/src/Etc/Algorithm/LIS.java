package Etc.Algorithm;

public class LIS {
	/*
	 * LIS(Longest Increasing Sequence)
	 * : 최장 증가 수열
	 * ex. [7,2,3,8,4,5] -> 해당 배열에서는 [2,3,4,5]
	 *
	 */
	int lis() {
		int max = 0;
		int[] arr = {7,2,3,8,4,5};
		int[] dp = new int[arr.length];		//LIS 저장 배열
		
		for (int i = 1; i < dp.length; i++) {
			for (int j = i-1; j >= 0; j--) {
				if(arr[i] > arr[j]) {
					dp[i] = (dp[i] < dp[j]+1)? dp[j]+1 : dp[i];
				}
			}
		}
		
		for (int i = 0; i < dp.length; i++) {
			if(max < dp[i]) max = dp[i];
		}
		
		//저장된 dp 배열 값 : [0,0,1,2,2,3]
		//LIS : dp배열에 저장된 값 중 최대 값 + 1
		
		return max + 1;
	}
	public static void main(String[] args) {
		int answer = new LIS().lis();
		System.out.println(answer);
	}
}
