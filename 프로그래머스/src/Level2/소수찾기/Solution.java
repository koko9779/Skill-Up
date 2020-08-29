package Level2.소수찾기;

import java.util.HashSet;

/*
 * numbers를 파싱해서 만들 수 있는 모든 수를 만든 후, 소수인지 확인
 * 
 * 1. 모든 순열을 구해서 확인
 * 2. 소수는 set에 저장 (중복방지)
 */
public class Solution {
	
	static boolean[] decimal;		//소수
	static int ans;
	static char[] num;
	static char[] select;			//순열
	static HashSet<Integer> set;	//HashSet을 이용 -> 중복 제거, 소수라면 set에 저장
	
    public static int solution(String numbers) {
    	
    	num = numbers.toCharArray();	//numbers의 각 숫자값들을 구한다.
    	
    	decimal = new boolean[numbers.length()];
    	ans = 0;
    	set = new HashSet<>();
    	 
    	//numbers 모든 경우의 순열 구하기
    	for(int i=1; i <= numbers.length(); i++) {
    		select = new char[i];
    		perm(0, i, numbers.length());
    	}
    	
        return set.size();
    }
    
    public static void perm(int start, int r, int n) {
    	if(start == r) {
    		//숫자로 변환
    		String str = "";
    		for(int i=0; i<select.length;i++)  str += select[i];   	
    		int num = Integer.parseInt(str);
    		
    		//예외 처리
    		if(num == 1 || num == 0) return;
    		
    		//소수인지 검사
    		boolean flag = false;	//소수이면 false;
    		for(int i=2; i<=Math.sqrt(num); i++) {
    			if(num % i ==0) flag = true;	
    		}
    		
    		//소수가 아니면
    		if(!flag) set.add(num);
    		
    		return;
    	}
    	for (int i = 0; i < n; i++) {    		
			if(!decimal[i]) {
				decimal[i] = true;
				select[start] = num[i];
				perm(start+1, r, n);
				decimal[i] = false;
			}
		}
    }
    
    public static void main(String[] args) {
    	String numbers = "17";
    	String numbers2 = "011";
    	
    	System.out.println(solution(numbers));
    	System.out.println(solution(numbers2));
    }
    
}
