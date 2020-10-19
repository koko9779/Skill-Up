package 쿼드트리;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
// 백준/별찍기/Main2447 관련 문제
import java.util.StringTokenizer;

/*
 * 1. 현재 구간에 있는 숫자들이 0으로만 이루어지거나 1로만 이루어져있다면 해당 숫자를 출력합니다.
 * 2. 1번 조건이 성립하지 않을 경우 '('를 출력하고 2사분면, 1사분면, 3사분면, 4사분면 순서로 구간을 절반으로 잘라 재귀호출하고 ')'를 출력합니다.
 * 3. 기저 사례는 구간의 크기가 1일 경우이고 구간의 크기가 1이면 해당 숫자를 출력합니다.
 */
public class Main1992 {
	static String answer = "";
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
		boolean[] check = new boolean[n];
	}
}
