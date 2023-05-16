package Etc.Algorithm;

import java.util.ArrayList;
import java.util.List;

/*
 * 순열(Permutation) 
 * : n개의 원소 중 r개의 원소를 꺼내는 경우의 수
 * 표기법 : nPr = n!/(n-r)!
 * 순서 유효(원소의 중복 허용, 조합은 순서가 유효하지 않아 중복 불허)
 */
public class Permutation {
	public static void main(String[] args) {
		List<String> arr = new ArrayList<>();
		arr.add("a");
		arr.add("b");
		arr.add("c");
		
		List<String> result = new ArrayList<>();
		reculsion(arr, result, arr.size(), 2);
	}
	/**
	 * 순열 구하기
	 * 
	 * @param arr		: 기준 리스트
	 * @param result	: 결과를 담아줄 리스트
	 * @param n			: 전체 갯수
	 * @param r			: 뽑을 갯수
	 */
	private static void reculsion(List<String> arr, List<String> result, int n, int r) {
		// 뽑을 게 없으면 return;
		if(r==0) {
			System.out.println(result.toString());
			return;
		}
		// 뽑을 게 있을 때, 총개수 중에 r개 뽑기
		for (int i = 0; i < n; i++) {
			result.add(arr.remove(i));
			reculsion(arr, result, n-1, r-1);				// i를 제외한 나머지 중에서 r-1개의 경우의 수 (재귀)
			arr.add(i, result.remove(result.size()-1));		// i: 원래있던 위치에 돌려놓기
		}
		
	}
}
