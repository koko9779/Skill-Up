package Etc.Challenge.Line;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution2 {
    public int[] solution(int[] ball, int[] order) {
        int[] answer = new int[ball.length];
        int count = 0;
        List<Integer> temp = new ArrayList<Integer>();
        
        Deque<Integer> deque = new ArrayDeque<Integer>();
        for (int i = 0; i < ball.length; i++) {
			deque.push(ball[i]);
		}
        
        while(deque.size() != 0){
        	for (int i = 0; i < order.length; i++) {
        		while(!temp.isEmpty()) {
        			if(temp.contains(deque.peekFirst())) {
        				answer[count++] = deque.pollFirst();
        			}else if(temp.contains(deque.peekLast())) {
        				answer[count++] = deque.pollLast();
        			}else {
        				break;
        			}
        		}
        		if(order[i]==deque.peekFirst()) {
        			answer[count++] = deque.pollFirst();
        		}else if(order[i]==deque.peekLast()) {
        			answer[count++] = deque.pollLast();
        		}else {
        			temp.add(order[i]);
        		}
			}
		}
        
        return answer;
    }
    public static void main(String[] args) {
    	int[] ball = {1,2,3,4,5,6};
    	int[] order = {6,2,5,1,4,3};
		int[] answer = new Solution2().solution(ball, order);
		for (int i = 0; i < answer.length; i++) {
			System.out.print(answer[i]+" ");
		}
	}
}
