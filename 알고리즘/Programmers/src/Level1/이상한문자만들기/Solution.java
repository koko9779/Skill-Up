package Level1.이상한문자만들기;

import java.util.StringTokenizer;

class Solution {
    public String solution(String s) {
        StringBuilder answer = new StringBuilder();
        StringTokenizer words = new StringTokenizer(s," ",true);
        char tmp;
        while(words.hasMoreTokens()){        	
        	String test = words.nextToken().toLowerCase();        	
        	if(test==" ") {
        		answer.append(" ");
        		continue;
        	}
        	for (int j = 0; j < test.length(); j++) {
        		tmp = test.charAt(j);
        		if(j%2==0) {
        			answer.append(Character.toUpperCase(tmp));
        		}else {
        			answer.append(test.charAt(j));
        		}
			}      	
		}
        return answer.toString();
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		System.out.println(s.solution("try hellosdf sdfsdfsdf"));
	}
}
