package Level2.JadenCase문자열만들기;

//단, 문자열 마지막에 공백이 포함되어 있으면 공백도 출력 해줘야합니다.
public class Solution {
    public String solution(String s) {
    	String answer = "";
    	boolean last_blank = false;
    	if((s.charAt(s.length()-1)+"").equals(" ")) last_blank = true;
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
        if(last_blank) answer += " ";
        
        return answer;
    }
}
