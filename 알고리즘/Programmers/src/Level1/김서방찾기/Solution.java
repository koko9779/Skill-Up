package Level1.김서방찾기;

public class Solution {
    public String solution(String[] seoul) {
        String answer = "";
        
        for (int i = 0; i < seoul.length; i++) {
        	if(seoul[i].compareTo("Kim")==0) {
        		answer = "김서방은 " + i + "에 있다";
        		break;
        	};
		}
        
        return answer;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		String[] seoul = {"Jane","Kim"};
		System.out.println(s.solution(seoul));
	}
}