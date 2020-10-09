package Etc.Challenge.Day2;

import java.util.LinkedList;

public class p1 {
    public int solution(int n) {
    	
    	//3진수로 변환
        String base3 = "";
        LinkedList stack = new LinkedList();
        
        while(n>0) {
        	stack.add(n%3);
        	n = n/3;
        }
        
        while(!stack.isEmpty()) {
        	base3 += stack.pollLast();
        }
        
        if(base3.equals("")) base3 ="0";
        
        //뒤집어서 다시 10진수로 변환       
        int result = 0;
        int r = 1;
        for (int i = 0; i < base3.length(); i++) {
			result += Integer.parseInt(base3.charAt(i)+"") * r;
			r *= 3;
		}
        return result;
    }
    public static void main(String[] args) {
		System.out.println(new p1().solution(45));
	}
}
