package Level1.수박수박수박수박수박수;

import java.util.ArrayList;

public class Solution {
    public String solution(int n) {
        ArrayList<String> subak = new ArrayList<String>();
        String answer = "";
        
        for (int i = 0; i < n; i++) {
			//인덱스가 짝수일 때
        	if(i%2==0) {
				subak.add("수");
			}
        	//홀수일 때
        	else {
				subak.add("박");
			}
		}
        
        for (String string : subak) {
			answer += string+"";
		}
        return answer;
    }
}