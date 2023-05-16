package 완전탐색알고리즘;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/*
 * 문제
 * N이 주어졌을 때, 1부터 N까지의 수로 이루어진 순열을 사전순으로 출력
 * 
 * 알고리즘
 * 순열 -> n중 for문을 짤 수 없으니, 재귀 사용
 */
public class Main10974 {
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String s = br.readLine();
		int N = Integer.parseInt(s);
		
		List number = new ArrayList<Integer>();
		boolean[] check = new boolean[N+1]; 
		
		pick(N, number, check);

	}

	private static void pick(int n, List number, boolean[] check) {
		//1~N까지 모두 들어왔을 때
		if(number.size() == n) {
			printAnswer(number);
			return;
		}
		for (int i = 1; i <= n; i++) {
			if(check[i]) continue;
			
			//false -> true
			check[i] = true;
			number.add(i);
			//check = 모두 true, number = 1,2,3...n
			pick(n,number,check);	//number.size = full 일때 다음으로 넘어감
			
			number.remove(number.size()-1);	//맨뒤의 값 제거
			check[i] = false;
		}
		
	}

	private static void printAnswer(List number) {
		for (int i = 0; i < number.size(); i++) {
			System.out.print(number.get(i)+" ");
		}
		System.out.println();
	}
	
}
