package Etc.Challenge.Day2;
/*
 * 시간초과
 */
public class p4 {
    public long solution(String s) {
        long result = 0;
        for (int i = 0; i < s.length(); i++) {
			for (int j = i+1; j < s.length()+1; j++) {
				result += beautiful(s.substring(i, j));
			}
		}
        return result;
    }
    public int beautiful(String s) {
    	int answer = 0;
        char min = s.charAt(0);
        char max = s.charAt(s.length()-1);
        int min_idx = 0;
        int max_idx = s.length()-1;
        int count = 0;		//같은거 개수 세기
        
        for (int i = 0; i < s.length(); i++) {
        	if(min==s.charAt(i)) count ++;
        }
        
        if(count == s.length()) return 0;
        
        answer = Math.max(answer, maxDown(s, min, max, min_idx, max_idx));
        answer = Math.max(answer, minUp(s, min, max, min_idx, max_idx));

        return answer;
    }
    public int maxDown(String s, char min, char max, int min_idx, int max_idx) {
    	int compare = 0;
        for (int i = 0; i < s.length(); i++) {
        	if(min != max) {
        		compare = max_idx - min_idx;
        		break;
        	}else {
    			max = s.charAt(max_idx-1);
    			max_idx --;
        	}
		}
        return compare;
    }
    public int minUp(String s, char min, char max, int min_idx, int max_idx) {
    	int compare = 0;
        for (int i = 0; i < s.length(); i++) {
        	if(min != max) {
        		compare = max_idx - min_idx;
        		break;
        	}else {
        		min = s.charAt(min_idx+1);
        		min_idx ++;
        	}
		}
        return compare;
        
    }
    public static void main(String[] args) {
		System.out.println(new p4().solution("baby"));
	}
}
