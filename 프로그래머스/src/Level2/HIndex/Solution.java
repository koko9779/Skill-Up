package Level2.HIndex;

import java.util.Arrays;

public class Solution {
    public int solution(int[] citations) {
    	
    	int max = 0;
    	//오름차순 정렬
    	Arrays.sort(citations);
    	
    	//뒤에서 부터 (=큰 수부터)
    	for (int i = citations.length ; i >= 0; i--) {
    		
        	//최대값 구하기
        	max = i;
        	System.out.println("max:"+max);
			
			int cnt = 0;
			for (int j = 0; j < citations.length; j++) {
				if(max<=citations[j]) {
					cnt ++;
				}
			}
			System.out.println("cnt:"+cnt);
			
			if(max<=cnt && (citations.length-cnt)<=max) {
				return max;
			}
			
		}
        return max;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		int[] citations = {0,0,0};
		int answer = s.solution(citations);
		System.out.println(answer);
	}
}
/*
 * length개수보다 작은 개수 만큼 for문 돌리기
 * length -i + 1 = i 활용; 
 * 
 * public class Solution {
    public int solution(int[] citations) {
        int answer = 0;
        Arrays.sort(citations);
 
        for (int i = 0; i < citations.length; i++) {
            int h = citations.length - i;
 
            if (citations[i] >= h) {
                answer = h;
                break;
            }
        }
 
        return answer;
    }
 */
