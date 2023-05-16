package 완전탐색알고리즘.백트래킹;

import java.io.IOException;
import java.util.Scanner;
/*
 * 문제
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
 *
 * 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
 * 
 * -> 순열 문제
 */
public class Main15649 {
	
	public static int[] arr;
	public static boolean[] visit;
	
	public void main(String[] args) throws IOException {
		
		Scanner in = new Scanner(System.in);
		int N = in.nextInt();
		int M = in.nextInt();
		
		// 큰 수 : N , 작은 수 : M
		if(N < M) {
			int tmp = M;
			M = N;
			N = tmp;
		}
		
		arr = new int[M];			// M개 선택
		visit = new boolean[N];		// 1~N 숫자를 가지고
		
		dfs(N, M, 0);
	}
	
	private void dfs(int N, int M, int depth) {
		
		// 마지막 선택값 일 때, SYSO 출력
		if(depth == M) {
			for (int val : arr) {
				System.out.print(val + " ");
			}
			System.out.println();
			return;
		}
		
		// N 만큼의 DFS 돌리기
		for (int i = 0; i < N; i++) {
			// 선택하지 않은 값일 때
			if(!visit[i]) {
				visit[i] = true;	
				arr[depth] = i+1;
				dfs(N, M, depth+1);
				visit[i] = false;
			}
		}
		
	}

}
