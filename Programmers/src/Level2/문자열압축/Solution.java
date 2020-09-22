package Level2.문자열압축;

import java.util.LinkedList;
import java.util.Queue;

public class Solution {
    public int solution(String s) {
        int MIN_VALUE = Integer.MAX_VALUE;
        
        if(s.length()==1) return 1;
        
        //문자를 i개 단위로 잘라서 압축하면
        for (int i = 1; i < s.length()/2+1; i++) {
			String compare = shorter(s,i);
			if(MIN_VALUE > compare.length()) MIN_VALUE = compare.length();
		}
        
        return MIN_VALUE;
    }

	private String shorter(String s, int split_num) {
		
		String answer = "";
		Queue<String> s_split = new LinkedList<String>();
		
		//split_num 개수씩 쪼개서 s_split배열에 넣기
		int start_index = 0;
		int end_index = start_index + split_num;
		while(start_index <= s.length()-1) {
			
			if(end_index>s.length()) end_index = s.length();
			
			s_split.add(s.substring(start_index, end_index));	
			
			start_index += split_num;
			end_index = start_index + split_num;
		}
		
		System.out.println(s_split);
		
		String word = s_split.poll();
		String compare;
		int count = 1;
		while(!s_split.isEmpty()) {
			compare = s_split.poll();
			if(compare.equals(word)) {
				count++;
				
			}else {
				if(count==1) {
					answer += word; 
					word = compare;
				}else {
					answer += count+word;
					word = compare;
					count = 1;
				}
			}
		}
		if(count!=1) {
			answer += count+word;
		}else {
			answer += word;
		}
		System.out.println(answer+", 길이: "+answer.length());
		
		return answer;
	}
	public static void main(String[] args) {
		int answer = new Solution().solution("aabbaccc"); //2a2ba2c
		System.out.println("결과값: "+answer);
	}
}
