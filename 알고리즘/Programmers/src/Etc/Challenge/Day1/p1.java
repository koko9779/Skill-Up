package Etc.Challenge.Day1;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
 * 문제1)
 * 정수 배열 numbers가 주어집니다.
 * numbers에서 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서 만들 수 있는 모든 수를
 * 배열에 오름차순으로 담아 return 하도록 solution 함수를 완성해주세요.
 */
public class p1 {
	public static final int HOW_NUMBERS = 2;
	public static List<Integer> result = new ArrayList<>();
    public int[] solution(int[] numbers) {
        
        boolean[] check = new boolean[numbers.length];
        
        List<Integer> tmp = new ArrayList<Integer>();
        
        //순열구하기
        perm(numbers, tmp, check);
        int[] answer = new int[result.size()];
        
        for (int i = 0; i < answer.length; i++) {
			answer[i] = result.get(i);
		}
        Arrays.sort(answer);
        
        return answer;
    }

	private void perm(int[] numbers, List<Integer> tmp, boolean[] check) {
		//2개를 뽑았다면 결과 반환
		if(tmp.size() == HOW_NUMBERS) {
			cul(tmp);
			return;
		}
		for (int i = 0; i < numbers.length; i++) {
			if(check[i]) continue;
			check[i] = true;
			tmp.add(numbers[i]);
			
			perm(numbers, tmp, check);
			
			tmp.remove(tmp.size()-1);
			check[i] = false;
		}
		
	}

	private void cul(List<Integer> tmp) {
		int num = 0;
		for (int i = 0; i < tmp.size(); i++) {
			num += tmp.get(i);
		}
		System.out.println("num:"+num);
		if(!result.contains(num)) {
			result.add(num);
		}
	}
    public static void main(String[] args) {
    	int[] numbers = {2,1,3,4,1};
		int[] answer = new p1().solution(numbers);
		for (int i = 0; i < answer.length; i++) {
			System.out.println(answer[i]+" ");
		}
	}
}
