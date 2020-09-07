package Level2.JadenCase문자열만들기;

public class Solution {
    public String solution(String s) {
    	String answer = "";
        String[] words = s.toLowerCase().split(" ");
        for (int i = 0; i < words.length; i++) {
        	if(words[i].length() >= 1) {
        		char[] alpha = words[i].toCharArray();
        		alpha[0] = Character.toUpperCase(alpha[0]);
        		words[i] = new String(alpha);
        	}
		}
        answer = words[0];
        for (int i = 1; i < words.length; i++) {
			answer += " " + words[i];
		}
        
        return answer;
    }
}
