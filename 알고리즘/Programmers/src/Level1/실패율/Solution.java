package Level1.실패율;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * 전체 스테이지의 개수: N
 * 사용자가 멈춰있는 스테이지 번호가 담긴 배열: stages
 * 실패율 : 스테이지에 도달했으나 클리어 못한 플레이어 수 / 스테이지 도달한 플레이어 수
 * 
 * 문제
 * 실패율이 높은 스테이지부터 내림차순으로 스테이지의 번호가 담긴 배열을 return
 *  
 * 주의할 점
 * 실패율 100%인 0/n과 도달 자체를 안한 것은 다르다.
 */ 
public class Solution {
    public int[] solution(int N, int[] stages) {
        int[] answer = new int[N];
        //failure : 스테이지num, 실패율
        Map<Integer, Double> failure = new LinkedHashMap<>();
        
        for (int i = 1; i <= N; i++) {
        	int count = 0;
        	double total = 0;
			for (Integer stage : stages) {
				if(i == stage) {
					count ++;
				}
				if(i <= stage) {
					total ++;
				}
			}
			//주의사항을 적용시키기 위해서
			if(count==0 || total==0) {
				failure.put(i, 0.0);
			}else {
				failure.put(i, (double) count/total);
			}
		}
        
        //map sort value 오름차순
        List<Map.Entry<Integer, Double>> entries = new LinkedList<>(failure.entrySet());
        Collections.sort(entries, (o2, o1) -> o1.getValue().compareTo(o2.getValue()));
       
        int count = 0;
        for (Map.Entry<Integer, Double> entry : entries) {
        	answer[count] = entry.getKey();
        	count++;
        }

        return answer;
    }
    public static void main(String[] args) {
    	int N = 8;
    	int[] stages = {1,2,3,4,5,6,7};
		int[] result = new Solution().solution(N, stages);
		for (Integer r : result) {
			System.out.print(r+" ");
		}
	}
}
