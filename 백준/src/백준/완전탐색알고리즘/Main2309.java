package 백준.완전탐색알고리즘;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main2309 {
/**
 * 문제
 * 9명의 난쟁이 중에 백설공주의 일곱 난쟁이 찾으시오.
 * 일곱 난쟁이의 키의 합 = 100
 * 
 * 풀이법:
 * 2명을 제외한 키의 합이 100인 경우 찾기
 */
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int sum = 0;
		int[] nanj = new int[9];
		for (int i = 0; i < nanj.length; i++) {
			nanj[i] = Integer.parseInt(br.readLine());		
			sum += nanj[i];
		}
		//오름차순 정렬
		Arrays.sort(nanj);
		
		for (int i = 0; i < nanj.length-1; i++) {
			for (int j = 1; j < nanj.length; j++) {
				if(sum-(nanj[i]+nanj[j])==100) {
					for (int k = 0; k < nanj.length; k++) {
						if(k==i || k==j) continue;
						System.out.println(nanj[k]);
					}
					System.exit(0);
				}
			}
		}
		
	}
}
