package Level1.문자열을정수로;

import java.util.ArrayList;

public class Solution {
    public int solution(String s) {
        int answer = 0;
        if(s.startsWith("-")) {
        	answer = new Integer(s.substring(0));
        }else {
        	answer = new Integer(s);
        }
        return answer;
    }
}
