package Etc;

import java.util.Scanner;

public class Backtracking {
/**
 * 백트래킹
 * : 모든 조합의 수를 살펴보는 것 (조건이 만족할 때만)
 * 
 * DFS(재귀사용)과 비슷하지만, DFS는 모든 곳을 방문하기 때문에 비효율적이다.
 * -> 그런 비효율적 경로를 차단. 목표지점에 갈 수 있는 가능성있는 루트 검사하는 방법
 * 
 * 대표적인 문제
 * N-Queen
 * 크기가 N*N인 체스판 위에 퀸 N개를 서로 공격할 수 없게 놓기
 * N이 주어졌을 때, 퀸을 놓는 방법의 수를 구하시오.
 * 
 * 풀이
 * DFS수행 -> 유망한 노드 검토 -> 서브 트리 이동 -> 백트래킹 수행
 * (해당 노드가 유망하면 퀸으로 루트로 잡고 다시 DFS)
 */

	static int col[];			//행 좌표 (최대 15)
	static int n;				//체스판 크기
	static int ans;

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		n = sc.nextInt();
		
		for (int i = 1; i <= n; i++) {
           // 첫번째 퀸의 시작점은 행을 기준. (i = 1) => (1, 1)
		   //							   (i = 2) => (1, 2)
		   // 							   (i = 3) => (1, 3)
            col = new int[16];
            col[1] = i;						//1열 i행

            // 1. DFS 수행 (다음 열인 2열 이동)
            dfs(2);							//2열 dfs -> 3열 dfs -> .. -> n열 dfs
        }

        // 정답 출력
        System.out.println(ans);
    }

    static void dfs(int row) {
        // 현재 열이 체스판을 넘어 섰으면
        if (row > n) {
            ++ans;
        } else {
            for (int i = 1; i <= n; i++) {
                // 현재 위치하고 있는 노드의 좌표를 저장 (row: 열, i: 행)
                col[row] = i;

                // 2. 유망한 노드 검토
                if (isPossible(row)) {
                    // 3. 서브 트리 이동 (해당 노드의 하위 노드)
                    dfs(row + 1);
                } else {
                    // 4. 백트래킹 수행, 해당노드는 가지치기 되어진다.
                    col[row] = 0;
                }
            }
        }
    }

    static boolean isPossible(int c) {
        // 이전 열들을 탐색하면서 유망한 노드인지 확인
        for (int i = 1; i < c; i++) {
            // 상위 노드에서 같은 행에 퀸이 있는지 여부
            if (col[i] == col[c]) {
                return false; 
            }
            // 대각선 검사, 상위 노드의 퀸과 현재 노드의 퀸의 가로 세로 거리가 같은지 검사
            if (Math.abs(col[i] - col[c]) == Math.abs(i - c)) {
                return false;
            }
        }
        return true;
                
	}
}
