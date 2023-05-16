package Naver;
//수열문제
public class Solution2 {
	static int[] first_blocks;
	public int[] solution(int[][] blocks) {
		
		int length = 0;									//블록의 총 개수
		int step = 1;									//층수
		for (int i = 0; i < blocks.length; i++) {
			length += step++;
		}
		step --;
		
		int[] answer = new int[length];					//answer
		boolean[] check = new boolean[length];			//check
		first_blocks = new int[step+1];					//각 층들의 첫 번째 블럭의 인덱스번호를 가진 배열
		
		/*****수열*****/
		int Sn=0;
		int r = 0;
		for (int i = 0; i < blocks.length; i++) {
			Sn += r++;
			first_blocks[i+1] = Sn;						//첫 번째 블럭 idx값
			int idx = first_blocks[i+1] + blocks[i][0];	//가지고 있는 블럭의 idx값 찾아서 넣어준다
			answer[idx] = blocks[i][1];					//answer에 값을 넣어주고 check = true로 변경
			check[idx] = true;							
		}
		for (int i = 1; i <= step ; i++) {
			for (int j = 0; j < i; j++) {
				bfs(answer, check, i);	
			}
		}
		
		return answer;
	}
	private void bfs(int[] answer, boolean[] check, int step) {
		for (int i = 0; i < step; i++) {
			int idx = first_blocks[step] + i;
			int parent = idx - step + 1;
			
			//root node는 항상 주어진다
			if(!check[idx]) {
				//가장 왼쪽
				if(i == 0 && check[idx + 1] && check[parent]) {
					answer[idx] = answer[parent] - answer[idx + 1];
					check[idx] = true;
				}
				//가장 오른쪽
				else if(i == step - 1 && check[idx - 1] && check[parent-1]) {
					//오른쪽 자식은 부모를 구하는 방법이 다르다
					answer[idx] = answer[parent-1] - answer[idx - 1];
					check[idx] = true;
				}
				//오른쪽에 값이 있을 경우
				else if(i != step-1 && check[idx + 1] && check[parent]){
					answer[idx] = answer[parent] - answer[idx + 1];
					check[idx] = true;
				}
				//왼쪽에 값이 있을 경우
				else if(i != 0 && check[idx - 1] && check[parent-1]){
					answer[idx] = answer[parent-1] - answer[idx - 1];
					check[idx] = true;
				}
			}
		}
	}

	public static void main(String[] args) {
		int[][] blocks = {{0,50},{0,22},{2,10},{1,4},{4,-13}};
		int[] result = new Solution2().solution(blocks);
		System.out.print("[");
		for (int i = 0; i < result.length; i++) {
			System.out.print(result[i]+" ");
		}
		System.out.print("]");
	}
}
