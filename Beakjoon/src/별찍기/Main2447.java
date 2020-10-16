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
 * -> 재귀, 분할정복
 */
public class Main2447 {
	static char star_arr[][];
	void starSorting(int x, int y, int N, boolean blank) {
		//공백 칸일 경우
		if(blank) {
			for (int i = x; i < x+N; i++) {
				for (int j = y; j < y+N; j++) {
					star_arr[i][j]=' ';
				}
			}
			return;
		}
		//더이상 쪼갤 수 없는 블록일 때
		if(N==1) {
			star_arr[x][y]='*';
			return;
		}
		
		/*
			 N=27 일 경우 한 블록의 사이즈는 9이고,
			 N=9   일 경우 한 블록의 사이즈는 3이듯
			 해당 블록의 한 칸을 담을 변수를 의미 size
			 
			 count는 별 출력 누적을 의미
		 */
		
		//패턴을 분석해 보면 항상 (1,1)일때 = 5번째일때 공백이였다 
		int size = N/3;
		int count = 0;
		for (int i = x; i < x+N; i+=size) {
			for (int j = y; j < y+N; j+=size) {
				count++;
				if(count==5) {	//공백 칸일 경우
					starSorting(i, j, size, true);
				}else {
					starSorting(i, j, size, false);
				}
			}
			
		}
	}
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		star_arr = new char[n][n];
		new Main2447().starSorting(0, 0, n, false);
		
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				sb.append(star_arr[i][j]);
			}
			sb.append('\n');
		}
		System.out.print(sb);
	}
}
