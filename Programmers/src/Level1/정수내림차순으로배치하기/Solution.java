package Level1.정수내림차순으로배치하기;

import java.util.Arrays;
import java.util.Collections;

public class Solution {
    public long solution(long n) {
        long answer = 0;
        String[] arr = new String[Long.toString(n).length()];
        arr = Long.toString(n).split("");
        Arrays.sort(arr,Collections.reverseOrder());
        String tmp = "";
        for (int i = 0; i < arr.length; i++) {
			tmp += Integer.parseInt(arr[i]);
		}
        answer = Long.parseLong(tmp);
        
        return answer;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		long answer = s.solution(51342);	
		System.out.println(answer);
	}
}