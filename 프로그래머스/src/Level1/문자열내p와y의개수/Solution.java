package Level1.문자열내p와y의개수;

public class Solution {
    boolean solution(String s) {
        boolean answer = true;
        int pCnt = 0;
        int yCnt = 0;
        char[] lowerS = s.toLowerCase().toCharArray();
        
        for (int i = 0; i < lowerS.length; i++) {
        	if(lowerS[i]=='p') {
        		pCnt++;
        	}
        	if(lowerS[i]=='y') {
        		yCnt++;
        	}
		}
        if(pCnt!=yCnt) {
        	answer = false;
        }
        
        return answer;
    }
    
    public static void main(String[] args) {
		Solution solution = new Solution();
		System.out.println(solution.solution("pypYy"));
		
	}
}
