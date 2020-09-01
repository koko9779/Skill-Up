package 백준.완전탐색알고리즘;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

/**
 * 문제
 * N개의 정수 배열 A를 정렬해서 최댓값을 구하시오
 * 풀이법: 순열 (최대-최소 아님)
 */
public class Main10819 {
	static int max = 0;
	private static void permutation(int[] array, int depth, int n) {
		if(depth == n) {
			sum(array, n);
			return;
		}
		for(int i = depth; i < n; i++) {
			swap(array, i, depth);
			permutation(array, depth+1, n);
			swap(array, i, depth);
		}
	}
	private static void swap(int[] array, int depth, int n) {
		int tmp = array[depth];
		array[depth] = array[n];
		array[n] = tmp;
	}
	private static void sum(int[] array, int n) {
		int sum = 0;
		for (int i = 2; i <= n; i++) {
			sum += Math.abs(array[i-2]-array[i-1]);
		}
		if(max<sum) max = sum;
	}
	public static void main(String[] args) throws IOException {
		
		//N개 입력받기
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int len = Integer.parseInt(br.readLine());
		int[] array = new int[len];
		
		//정수 배열 A 입력받기
		StringTokenizer st = new StringTokenizer(br.readLine());
		for (int i = 0; i < len; i++) {
			array[i] = Integer.parseInt(st.nextToken());
		}
		//순열 구하기
		permutation(array, 0, len);
		System.out.println(max);
	}
	
	/**
	 * [풀이 과정]
	 * 
	 * i=0
	 * swap[0]<->[0]
	 * -------------->perm(arr,1,n)
	 *                i=1
	 *                swap[1]<->[1]
	 *                --------------->perm(arr,2,n)
	 *                				  i=2
	 *                				  swap[2]<->[2]
	 *                				  ..
	 *                				  ..
	 *                				  ------------------>perm(arr,n,n)
	 *                									 n == n
	 *                									 max = |arr[0]-arr[1]| + |arr[1]-arr[2]| + .. + |arr[n-2]-arr[n-1]|
	 *                				  <------------------
	 *                				  ..
	 *                				  ..
	 *                				  swap[2]<->[2]
	 *                
	 *                				  i=3 
	 *                				  swap[2]<->[3]
	 *                				  ------------------>perm
	 *                
	 *                ...
	 *                
	 *                <--------------
	 *swap[0]<->[n]
	 *perm(arr,n,n)
	 *swap[0]<->[n]                
	 */
}
