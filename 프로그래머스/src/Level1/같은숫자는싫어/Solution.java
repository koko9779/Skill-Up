package Level1.같은숫자는싫어;

import java.util.*;

public class Solution {
    public int[] solution(int []arr) {
        int[] answer = {};
        ArrayList<Integer> tmp = new ArrayList<Integer>();
        for (int i = 0; i < arr.length; i++) {
			if(i == arr.length-1) {
				tmp.add(arr[i]);
            }else{
                if(arr[i]!=arr[i+1]) {
                    tmp.add(arr[i]);
                }else {
                    continue;
                }
            }
        }
        answer = new int[tmp.size()];
        
        for (int i = 0; i < answer.length; i++) {
			answer[i] = tmp.get(i).intValue();
		}
        
        return answer;
    }
}