package Level2.올바른괄호;

import java.util.Stack;

public class Solution {
    boolean solution(String s) {
        boolean answer = false;
        Stack<Character> stack = new Stack<Character>();
        for (int i = 0; i < s.length(); i++) {
        	//'('이면 stack에 넣어줌
			if(s.charAt(i)=='(') {
				stack.push(s.charAt(i));
			}else {
				//')'먼저오면 false
				if(stack.isEmpty()) {
					return answer;
				//바로 앞 인자가 '('가 아니면 false
				}else if(stack.pop()!='(') {
					return answer;
				}
			}
		}
        //무사히 마무리 했는데 stack이 비어있는게 아니라면 true
        if(stack.isEmpty()) {
        	answer = true;
        }

        return answer;
    }
}
