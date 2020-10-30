package NHN;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

//시멘트 양 계산하기

public class Solution2 {
	static int cement = 0;
	static int[] builded;
	private static void solution(int day, int width, int[][] blocks) {
		builded = new int[width];
		for (int i = 0; i < day; i++) {
			for (int j = 0; j < blocks[0].length; j++) {
				builded[j] += blocks[i][j];
			}
			fill(builded);
			System.out.println(cement+"cement 양");
		}
	}

	private static void fill(int[] builded) {
		List<Integer> frame = new ArrayList<>();
		int left = builded[0];
		int right;
		for (int i = 1; i < builded.length; i++) {
			right = builded[i];
			
			//left와 right사이 공간이 있을 때
			if(left+1!=right) {
				
				if(Math.min(left, right) > 
				
				//프레임에 맞게 시멘트 붓기
				while(!frame.isEmpty()) {
					cement += Math.min(left, right) - frame.get(0);
					frame.remove(0);
				}
				left = right;
			}
		}
		
	
	}

	public static void main(String[] args) throws Exception {
		int day = 3;									//공사 기간 일수
		int width = 10;									//작업 영역 너비
		int[][] blocks = {{6,12,0,2,8,4,0,7,3,6},		//1일차에 쌓을 벽돌의 개수
						  {6,1,3,0,2,8,0,0,13,8},		//2일차에 쌓을 벽돌의 개수
						  {6,3,0,10,6,5,7,0,0,3}};		//3일차에 쌓을 벽돌의 개수
		
		solution(day, width, blocks);
		System.out.println(cement);
	}
}
