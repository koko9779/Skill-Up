package 백준.완전탐색알고리즘;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
/**
 * 문제
 * N개의 도시를 거쳐 다시 돌아오는 순회 여행 경로를 계획한다
 * 이 때, 재방문은 불가능하다
 * 가장 적은 비용이 드는 여행 경로를 구하시오.
 *
 */
public class Main10971 {
	static int answer = Integer.MAX_VALUE;	//Integer(32비트 정수) 최대값 상수
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int [][] w = new int[n][n];
		for (int i = 0; i < n; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			for (int j = 0; j < n; j++) {
				w[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		List<Integer> picked = new ArrayList<>();
		boolean[] check = new boolean[n];			//재방문 체크
		
		pick(n, picked, check, w);
		System.out.println(answer);
	}

	private static void pick(int n, List<Integer> picked, boolean[] check, int[][] w) {
		if(picked.size() == n) {
			calAnswer(n, picked, w);
			return;
		}
		for (int i = 0; i < n; i++) {
			if(check[i]) continue;
			check[i] = true;
			picked.add(i);
			pick(n, picked, check, w);
			picked.remove(picked.size()-1);
			check[i] = false;
		}
		
	}

	private static void calAnswer(int n, List<Integer> picked, int[][] w) {
		boolean ok = true;
		int sum = 0;
		for (int i = 0; i < n-1; i++) {
			int val = w[picked.get(i)][picked.get(i+1)];
			if(val == 0) ok = false;
			else sum += val;
		}
		if(ok && w[picked.get(n-1)][picked.get(0)] != 0) {
            sum += w[picked.get(n-1)][picked.get(0)];
            if(answer > sum) answer = sum;		//최소값으로 반환
		}
		
	}

}
