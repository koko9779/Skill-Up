package Level2.최솟값만들기;

import java.util.Arrays;

// 최솟값 * 최댓값 +.... = 누적 값의 최솟값
public class Solution {
    public int solution(int []A, int []B){
        //오름차순 정렬
        Arrays.sort(A);
        Arrays.sort(B);
        
        int sum = 0;
        
        //길이가 같은 A와 B 
        for (int i = 0; i < A.length; i++) {
        	sum += A[i] * B[B.length-i-1];
		}
        
        return sum;
    }
}
