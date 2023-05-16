package 쿼드트리;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/*
 * 1. 현재 구간에 있는 숫자들이 0으로만 이루어지거나 1로만 이루어져있다면 해당 숫자를 출력합니다.
 * 2. 1번 조건이 성립하지 않을 경우 '('를 출력하고 2사분면, 1사분면, 3사분면, 4사분면 순서로 구간을 절반으로 잘라 재귀호출하고 ')'를 출력합니다.
 * 3. 기저 사례는 구간의 크기가 1일 경우이고 구간의 크기가 1이면 해당 숫자를 출력합니다.
 */
public class Main1992 {
	
	static String answer = "";
	static int[][] arr;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.valueOf(br.readLine());
		
		// N*N 배열 만들기
		arr = new int[n][n];
		for (int i = 0; i < n; i++) {
			String str = br.readLine();
			for (int j = 0; j < n; j++) {
				arr[i][j] = Integer.valueOf(str.substring(j,j+1));
			}
		}
		
		quadTree(n,0,0);
		System.out.println(answer);
	}
	
	public static void quadTree(int size, int row, int col) {
		if(size == 1) {
			answer += arr[col][row];
			return;
		}
		
		boolean same = true;
		for (int i = col; i < col+size; i++) {
			if(!same) break;
			for (int j = row; j < row+size; j++) {
				if(arr[col][row] != arr[i][j]) {
					same = false;
					break;
				}
			}
		}
		
		if(same) {
			answer += arr[col][row];
			return;
		}
		
		int ns = size/2;
		
		answer +="(";
		quadTree(ns, row, col);
		quadTree(ns, row+ns, col);
		quadTree(ns, row, col+ns);
		quadTree(ns, row+ns, col+ns);
		answer +=")";
	}

}
