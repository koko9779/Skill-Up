package Level3.네트워크;

/*
 * 깊이/너비 우선 탐색 문제
 * 
 */
public class Solution {
	
	//n : 정점의 개수
	//computers : 정점 사이의 관계를 나타냄
    public int solution(int n, int[][] computers) {
    	
    	int answer = 0;
    	boolean [] visit = new boolean[n+1];
    	
    	for (int i = 0; i < n; i++) {
			if(!visit[i]) {
				dfs(computers, i, visit);
				answer++;
			}
		}
    	
        return answer;
    }

	boolean[] dfs(int[][] computers, int i, boolean[] visit) {
		
		//첫번째 노드
		visit[i] = true;
		
		for (int j = 0; j < computers.length; j++) {
			//스스로가 아닌 노드 && i와 연결된 노드 && 방문기록 없는 노드
			if(i != j && computers[i][j] == 1 && !visit[j]) {
				//j부터 깊이우선탐색
				visit = dfs(computers, j, visit);
			}
		}
		
		return visit;
	}
}
