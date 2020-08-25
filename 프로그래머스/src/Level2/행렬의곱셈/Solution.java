package Level2.행렬의곱셈;

public class Solution {
    public int[][] solution(int[][] arr1, int[][] arr2) {
    	
    	//크기 = 앞쪽 (행) * 뒤쪽 (열)
        int[][] answer = new int[arr1.length][arr2[0].length];
        
        for (int i = 0; i < answer.length; i++) {
			for (int j = 0; j < answer[0].length; j++) {
				for (int k = 0; k < arr1[0].length; k++) {
					answer[i][j] += arr1[i][k] * arr2[k][j]; 
				}
			}
		}
        
        return answer;
    }
    public static void main(String[] args) {
    	int[][] arr1 = {{1,4},{3,2},{4,1}};
    	int[][] arr2 = {{2,2},{3,3}};
		new Solution().solution(arr1, arr2);
	}
}
