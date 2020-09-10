package Level1.문자열내마음대로정렬하기;

import java.util.Arrays;

public class Solution {
    public String[] solution(String[] strings, int n) {
    	
    	//n번째 문자를 맨 앞에 둬서 소팅한 후, 맨 앞 문자 제거 
        for (int i = 0; i < strings.length; i++) {
			strings[i] = strings[i].charAt(n) + strings[i];
		}
        Arrays.sort(strings);
        
        for (int i = 0; i < strings.length; i++) {
			strings[i] = strings[i].substring(1, strings[i].length());
		}
        
        return strings;
    }
    
    public static void main(String[] args) {
		Solution s = new Solution();
		String[] strings = {"abce","abcd","cdx"};
		String[] a = s.solution(strings, 2);
		for (int i = 0; i < strings.length; i++) {
			System.out.print(a[i]+" ");
		}
	}
}