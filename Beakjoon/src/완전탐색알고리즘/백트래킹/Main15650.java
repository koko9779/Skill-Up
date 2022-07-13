package 완전탐색알고리즘.백트래킹;

import java.io.IOException;
import java.util.Scanner;
import java.util.StringTokenizer;

/*
 * 문제
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
 *
 * 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
 * 고른 수열은 오름차순이어야 한다.
 */
public class Main15650 {
	
	public int[] arr;
	int N, M;

	public void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String s = sc.nextLine().trim();
		
		// 문자열 s를 " "를 기준으로 나누기
		StringTokenizer st = new StringTokenizer(s, " ");
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		
		arr = new int[M];			// M개 선택
		
		dfs(1, 0);
		
	}
	
	private void dfs(int start, int depth) {
		if(depth == M) {
			for(int val : arr) {
				System.out.print(val + " ");
			}
			System.out.println();
			return;
		}
		// N만큼 DFS 돌리기
		for (int i = start; i <= N; i++) {
			arr[depth] = i;
			dfs(i+1, depth+1);
		}
	}
}
