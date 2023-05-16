package Level2.가장큰정사각형찾기;

//1로 이루어진 가장 큰 정사각형을 찾아 넓이를 return 하시오
//효율성면에서 떨어짐

public class Solution {
    public int solution(int [][]board){
        int MAX_SIZE = 0;
        int side = 0;
        //마지막줄에서는 가장 큰 정사각형이 나올 수 없으므로 제외하기
        for (int i = 0; i < board.length-1; i++) {
        	for (int j = 0; j < board[0].length; j++) {
        		if(board[i][j]==1 && board.length-side>i && board[0].length-side>j) {
        			side = big_square(board, i, j, side);
        			int size = (int) Math.pow((side),2);
        			if(MAX_SIZE<size) MAX_SIZE = size;
        		}
        	}
        }
        
        
        return MAX_SIZE;
    }
    private int big_square(int[][] board, int i, int j, int side) {
    	int increase = side;
    	//정사각형을 만들 수 있는 변이 존재한다면
    	while(board[(i+increase)][j]==1 && board[i][(j+increase)]==1) {

    		if(!full_check(increase, board, i, j)) {
    			break;
    		}else {
    			side++;
    			//side 크기가 최대값일 경우
    			if(i+increase==board.length-1 || j+increase==board[0].length-1) {
    				break;    		
    			}
    			increase++;
    		}
	    	
    	}
    	
		return side;
	}
	private boolean full_check(int increase, int[][] board, int i, int j) {
		boolean full_one = true;
		//1로 꽉찬 정사각형인지 확인
		for (int k = 0; k < increase+1; k++) {
			for (int k2 = 0; k2 < increase+1; k2++) {
				if(board[i+k][j+k2]==0) {
					return false;
				}
			}
		}
		return full_one;
	}
	public static void main(String[] args) {
		int [][] board = {{1,0},{0,0}};
		//int [][] board = {{0,0,0,0},{0,0,0,0},{0,0,0,0},{0,0,0,0}};
    	//int [][] board = {{0,1,1,1},{1,1,1,1},{1,1,1,1},{0,0,1,0}};
		int answer = new Solution().solution(board);
		System.out.println(answer);
	}
}
