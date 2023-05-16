package Level2.나라의숫자;

import java.util.HashMap;
import java.util.Map;

//124 나라의 숫자
public class Solution {
	//1. 124 나라에는 자연수만 존재한다.
	//2. 124 나라에는 모든 수를 표현할 때 1,2,4만 사용한다.
	
    public String solution(int n) {
        String answer = "";
        
        //124진법
        Map<Integer, Integer> ex = new HashMap<Integer, Integer>();
        ex.put(1, 1);
        ex.put(2, 2);
        ex.put(0, 4);
        
        while(n>0) {
        	int number = ex.get(n%3).intValue();
        	n /= 3;
        	if(number==4) n--;      	
        	answer = number+answer;
        }               
        return answer;
    }
    
    public static void main(String[] args) {
		Solution s = new Solution();
		System.out.println(s.solution(10));
	}
}
