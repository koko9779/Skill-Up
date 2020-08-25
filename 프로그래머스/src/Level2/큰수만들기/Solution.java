package Level2.큰수만들기;

import java.util.Arrays;

public class Solution {
    public String solution(String number, int k) {
    	String answer = "";
    	//문자 분리
    	String[] num_ori = new String[number.length()];
    	num_ori = number.split("");
    	
    	//배열 복사
    	String[] num_arr = num_ori.clone();
    	
    	//복사한 배열 정렬
    	Arrays.sort(num_arr);
    	
    	
    	//삭제해아하는 인자 제외하고 0대입
    	for (int i = 0; i < k; i++) {
			num_arr[i] = "0";
		}
        
    	for (int i = 0; i < num_ori.length; i++) {
			if(num_arr[i]!="0") answer+= num_ori[i];
			
		}
    	
        return answer;
    }
    public static void main(String[] args) {
		System.out.println(new Solution().solution("1231234", 3));
	}
}
