package Level2.주식가격;

import java.util.Stack;

public class Solution {
    public int[] solution(int[] prices) {
    	Stack<Integer> beginIdxs = new Stack<Integer>();
    	int i = 0;
    	int[] terms = new int[prices.length];
    	
    	beginIdxs.push(i);

    	for (i = 1; i < prices.length; i++) {
    		//Stack에 값이 있고, 뒤쪽에 더 작은 값이 나온다면
			while(!beginIdxs.empty() && prices[i]<prices[beginIdxs.peek()]) {
				int beginIdx = beginIdxs.pop();
				terms[beginIdx] = i - beginIdx;
			}
			//아니면 push
			beginIdxs.push(i);
		}
    	//Stack이 비지 않았다면
    	while(!beginIdxs.empty()) {
    		int beginIdx = beginIdxs.pop();
    		terms[beginIdx] = i-beginIdx-1;
    	}
    	
    	return terms;
    	
    	/*
    	배열로 푸는 법
        int[] answer = new int[prices.length];
        int count = 0;
        for (int i = 0; i < prices.length-1; i++) {
			count = 0;
			for (int j = i+1; j < prices.length; j++) {
				if(prices[i]<=prices[j]) {
					count++;
				}else {
					count++;
					break;
				}
			}
			answer[i] = count;
		}
        
        answer[prices.length-1] = 0;
        
		return answer;
		*/
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		int[] prices = {1,2,3,2,3};
		System.out.println(s.solution(prices));
	}
}
