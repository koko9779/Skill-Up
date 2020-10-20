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
	static int num = 0;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		
		// N*N 배열 만들기
		int [][] arr = new int[n][n];
		for (int i = 0; i < n; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			for (int j = 0; j < n; j++) {
				arr[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		
		quadTree(arr,0,0,arr.length);
	}
	
	public static void quadTree(int[][] arr, int row, int col, int N) {
		if(isAble(arr, row, col, N)) {
			answer += num + ")";
		}else {
			
			int size = N/2;
			answer +="(";
			
			//해당 영역을 다시 4분할하여 탐색
			quadTree(arr, row, col, size);
            quadTree(arr, row, col + size, size);
            quadTree(arr, row + size, col, size);
            quadTree(arr, row + size, col + size, size);
		}
	}
	
	//해당 영역이 전부 1이거나 0인 경우 배열의 원소값 +1
	public static boolean isAble(int[][] arr, int row, int col, int size) {
		int t = arr[row][col];
		num = arr[0][0];
        for(int i=row; i < row+size; i++) {
            for(int j=col; j < col+size; j++) {
                if(t != arr[i][j]) return false;
            }
        }
        return true;
	}
}
