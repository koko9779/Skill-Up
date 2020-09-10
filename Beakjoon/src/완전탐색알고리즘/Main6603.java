package 완전탐색알고리즘;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

/**
 * 문제
 * 1~49 숫자 중에 k개를 골라 집합 S를 만든 다음, 그 중에 6개의 수를 선택해서 결과를 만든다.
 * 이 때 경우의 수를 구하시오
 * 풀이법 : 순열 + 순서
 */
public class Main6603 {
	public static final int LOTTO_SELECT_NUM = 6;
	public static void main(String[] args) throws IOException {
		
		//k개 입력받기
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		while(true){
			String str = br.readLine();
			if(str.equals("0")) break;
			else {
				StringTokenizer st = new StringTokenizer(str);
				int k = Integer.parseInt(st.nextToken());
				
				//S의 원소 입력받기
				int[] inputAry = new int[k];
				for (int i = 0; i < k; i++) {
					inputAry[i] = Integer.parseInt(st.nextToken());
				}
				
				//check array, result List 생성하기
				boolean[] check = new boolean[k];
				List<Integer> result = new ArrayList<>();
				
				//순열 구하기
				perm(inputAry, result, check, k);
				System.out.println();
			}
		};
	}

	public static void perm(int[] inputAry, List<Integer> result, boolean[] check, int k) {
		//6개를 모두 뽑았다면 결과 출력
		if(result.size()==LOTTO_SELECT_NUM) {
			printAnswer(result);
			return;
		}
		//오름차순으로 정렬하기 위한 조건
		int smallestNum = result.isEmpty()? 0 : result.get(result.size()-1);
		
		for (int i = 0; i < k; i++) {
			if(check[i]) continue;
			if(inputAry[i] < smallestNum) continue;
			
			check[i] = true;
			result.add(inputAry[i]);
			perm(inputAry, result, check, k);
			result.remove(result.size()-1);
			check[i] = false;
		}
	}

	public static void printAnswer(List<Integer> result) {
		for (int i = 0; i < result.size(); i++) {
			System.out.print(result.get(i)+" ");
		}
		System.out.println();
	}
}
