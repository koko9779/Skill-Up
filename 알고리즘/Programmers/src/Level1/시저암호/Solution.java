package Level1.시저암호;

public class Solution {
	//어떤 문장에서 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식
	//ex. "AB" 1만큼-> "BC", "z" 1만큼-> "a"
    public String solution(String s, int n) {
        String answer = "";
        char alpha = ' ';
        char start = ' ';      
        for (int i = 0; i < s.length(); i++) {
        	alpha = s.charAt(i);
        	if(alpha!= ' ') {
        		start = Character.isLowerCase(alpha)? 'a': 'A';
        		alpha = (char)(start+(alpha+n-start)%26);
        	}
        	answer += alpha;
		}
        return answer;
    }
}