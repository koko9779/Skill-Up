package Level2.괄호변환;

import java.util.Stack;

public class Solution {
    public String solution(String w) {
        String answer = "";
        
        //1 입력이 빈 문자열인 경우, 빈 문자열을 반환합니다. 
        if(w.equals("")) return answer;
        
        //2 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리합니다.
        int open_sign = 0;
        int close_sign = 0;
        
        for (int i = 0; i < w.length(); i++) {
			if(w.charAt(i) == '(') open_sign ++;
			if(w.charAt(i) == ')') close_sign ++;
				
			if(open_sign == close_sign && open_sign != 0 && close_sign != 0) {
				break;
			}
		}
        
        String u = w.substring(0, open_sign + close_sign);
        String v = w.substring(open_sign + close_sign, w.length());
        
        //3 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행합니다. 
        if(check(u)) {
        	//3-1 수행한 결과 문자열을 u에 이어 붙인 후 반환합니다. 
        	return u+solution(v);
        }else {
        	//4 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정을 수행합니다. 
        	
        	//4-1 빈 문자열에 첫 번째 문자로 '('를 붙입니다. 
        	answer += "(";
        	//4-2 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙입니다. 
        	answer += solution(v);
        	//4-3 ')'를 다시 붙입니다. 
        	answer += ")";
        	//4-4 u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙입니다. 
        	u = u.substring(1,u.length()-1);
        	String reverse = "";
        	for (int i = 0; i < u.length(); i++) {
				if(u.charAt(i) == '(') reverse += ")";
				if(u.charAt(i) == ')') reverse += "(";
			}
        	u = reverse;
        	answer += u;
        	//4-5 생성된 문자열을 반환합니다.
        	
        }
        
        return answer;
    }
    
    //"올바른 괄호 문자열" 인지 check하는 함수
	private boolean check(String s) {
		if(s.length()==0) return true;
		Stack<Character> sign = new Stack<Character>();
		
		//'('일 경우 push, ')'일 경우 pop or return;
		for (int i = 0; i < s.length(); i++) {
			if(s.charAt(i) == '(') sign.push('(');
			else {
				if(sign.isEmpty()) {
					return false;
				}else {
					sign.pop();
				}
			}
		}
		
		//Stack에 값이 남아있으면 괄호 개수가 짝짝이다.
		if(!sign.isEmpty()) {
			return false;
		}else {
			return true;
		}
	}
}
