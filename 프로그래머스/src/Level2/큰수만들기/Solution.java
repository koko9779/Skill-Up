package Level2.큰수만들기;

import java.util.Stack;

//리스트 복사
//Collections.copy()는 빈 list 복사에는 적절하지않다.
//왜냐하면, 저 메소드는 capacity를 자동으로 늘려주지않아서 사이즈 조절이 안된다.

public class Solution {
    public String solution(String number, int k) {
    	//구현해야하는 길이만큼 result 생성
        char[] result = new char[number.length() - k];
        Stack<Character> stack = new Stack<>();

        for (int i=0; i<number.length(); i++) {
        	//문자 비교
            char c = number.charAt(i);
            //스택이 안비었으면, 스택값보다 문자가 크고, k감소한 값이 0보다 크면 빼내기.
            while (!stack.isEmpty() && stack.peek() < c && k-- > 0) {
                stack.pop();
            }
            //1) 스택이 비었으면 일단 푸쉬.
            stack.push(c);
        }
        for (int i=0; i<result.length; i++) {
            result[i] = stack.get(i);
        }
        return new String(result);
    }
//    public String solution(String number, int k) {
//    	
//    	//시간 절약을 위해서 사용
//    	StringBuilder sb = new StringBuilder();
//    	
//    	int cnt = number.length()-k;		//구현해야하는 길이
//    	int left = 0;
//    	int right = number.length()-cnt;	//제거해야하는 길이
//    	int max = -1;
//    	int idx = 0;
//    	
//    	while(cnt>0) {
//    		max = -1;
//    		//가장 큰 값 찾기
//    		for (int i =left; i <= right; i++) {
//				int num = number.charAt(i) - '0';	//i번째 문자 숫자형 구하기
//				if(num > max) {
//					idx = i;
//					max = num;
//				}
//			}
//    		//가장 큰 값 append
//    		sb.append(number.charAt(idx));
//    		left = idx + 1;
//    		right = number.length()- --cnt;
//    	}
//    	
//        return sb.toString();
//    }
    public static void main(String[] args) {
		System.out.println(new Solution().solution("4177252841", 4));
	}
}
