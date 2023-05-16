package Level2.가장큰수;

import java.util.Arrays;
import java.util.Comparator;

public class Solution {
    public String solution(int[] numbers) {
    	
    	String answer = "";
    	String[] str_numbers = new String[numbers.length];
    	
    	for (int i = 0; i < str_numbers.length; i++) {
			str_numbers[i] = String.valueOf(numbers[i]);
		}
    	
    	//내림차순 정렬 재정의
    	Arrays.sort(str_numbers, new Comparator<String>() {
			@Override
			public int compare(String o1, String o2) {
				return (o2+o1).compareTo(o1+o2);
			}
		});
    	
    	//0일 경우, 0000 이 아닌 0 반환
    	if(str_numbers[0].equals("0")) {
    		answer += "0";
    	}else {
    		for (int i = 0; i < str_numbers.length; i++) {
				answer += str_numbers[i];
			}
    	}
    	return answer;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		int[] numbers = {6,10,2};
		String answer = s.solution(numbers);
		System.out.println(answer);
	}
}
