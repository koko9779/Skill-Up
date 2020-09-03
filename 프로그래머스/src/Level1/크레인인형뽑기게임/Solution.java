package Level1.크레인인형뽑기게임;

import java.util.Stack;

public class Solution {
    public int solution(int[][] board, int[] moves) {
        int answer = 0;
        Stack<Integer> stack = new Stack<>();
        for(Integer move: moves) {
			// 행: moves[i], 열: 제일 상단에 있는 원소
        	int moveIndex = move -1;
        	for (int i = 0; i < board.length; i++) {
        		
        		int peek = board[i][moveIndex];
        		if(peek==0) continue;
        		
        		//바로 밑이랑 원소값이 같은지 검사
        		if(!stack.isEmpty() && stack.peek()==peek) {
        			stack.pop();
        			answer ++;
        		}else {
        			stack.push(peek);
        		}
				board[i][moveIndex] = 0;
				break;
			}
		}

        return answer * 2;
    }
    public static void main(String[] args) {
    	int[][] board = {{0,0,0,0,0},{0,0,1,0,3},{0,2,5,0,1},{4,2,4,4,2},{3,5,1,3,1}};
    	int[] moves = {1,5,3,5,1,2,1,4};
		System.out.println(new Solution().solution(board, moves));
	}
}
