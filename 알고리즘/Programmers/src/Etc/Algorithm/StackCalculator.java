package Etc.Algorithm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class StackCalculator {
	public void solution() throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String s = br.readLine();
		String result = "";
		Stack<Character> stack = new Stack<>();
		for (int i = 0; i < s.length(); i++) {
			//0~9라면 (0:48,9:57)
			if(s.charAt(i) > 47 && s.charAt(i) < 58) {
				result += s.charAt(i);
			}else {
				String tmp = s.charAt(i) + "";
				if(tmp.equals("(")) {
					stack.push(s.charAt(i));
				}else if(tmp.equals(")")){
					char check = stack.peek();
					while(!(check+"").equals("(")) {
						stack.pop();
						check = stack.peek();
					}
				}
				//특수문자일 경우
				else {
					
				}
				
			}
		}
	}
	public static void main(String[] args) throws IOException {
		new StackCalculator().solution();
	}
}
