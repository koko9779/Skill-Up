package 별찍기;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
/*
 * 문제
 * 재귀적 패턴으로 별 찍기
 * N이 3의 거듭제곱(3,9,27, ...)이라고 할 때, 크기 N의 패턴은 N×N 정사각형 모양이다.
 * 크기 3의 패턴은 가운데에 공백이 있고, 가운데를 제외한 모든 칸에 별이 하나씩 있는 패턴이다.
 * ***
 * * *
 * ***
 * 만약 N이 3보다 클 경우, 크기 N의 패턴은 공백으로 채워진 가운데 (N/3)×(N/3) 정사각형을 크기 N/3의 패턴으로 둘러싼 형태이다. 
 * 
 * 예)
 * N=27
 * N=9인 사각형으로 둘러싸인 가운데가 N=9만큼 빈 사각형
 * -> 재귀
 */
public class Main2447 {
	public static char star_arr[][];
	public char[][] starSorting(int n) {
		char arr[][] = new char[n][n];
		//N=3일 때
		if(n==3) {
			boolean side;
			for (int i = 0; i < n; i++) {
				if(i==0 || i==n-1) side = true;
				else side = false;
				for (int j = 0; j < n; j++) {
					if(side) {
						arr[i][j] = '*';
					}else {
						if(j==0 || j==n-1) arr[i][j]='*';
						else arr[i][j]=' ';
					}
				}
			}
		//그 외 재귀함수
		}else {
			
		}
		return arr;
	}
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		star_arr = new Main2447().starSorting(n);
		for (int i = 0; i < star_arr.length; i++) {
			for (int j = 0; j < star_arr.length; j++) {
				System.out.print(star_arr[i][j]);
			}
			System.out.println();
		}
	}
}
