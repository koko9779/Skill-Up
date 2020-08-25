package Level2.프린터;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

//중요도가 높은 문서 먼저 인쇄하는 시스템
public class Solution {
	
//priorities: 문서의 중요도가 순서대로 담긴 배열
//location: 내가 인쇄를 요청한 문서가 현재 대기 몇번째인지
	
//	public int solution(int[] priorities, int location) {
//		List<Integer> list = new ArrayList<Integer>();
//		for (int i : priorities) list.add(i);
//		int loc = location, cnt = 0;
//		
//		while(!list.isEmpty()) {
//			int max = list.get(0);
//			for (int i = 1; i < list.size(); i++) {
//				if(list.get(0)<list.get(i)) {
//					if(loc==0) loc = list.size()-1;
//					else loc --;
//				
//				int tmp = list.get(0);
//				list.remove(0);
//				list.add(tmp);
//				max = 0;
//				break;
//			}
//		}
//		
//		if(max != 0) {
//			list.remove(0);
//			cnt ++;
//			if(loc == 0) break;
//			else loc --;
//		}
//	}
//	return cnt;
//	}
		
    public int solution(int[] priorities, int location) {
        
    	int answer = 0;
    	
        //Queue에 문서 정렬
        Queue<Integer> queue = new LinkedList<>();
        for (int i : priorities) {
        	queue.add(i);
        }

        //가장 우선순위가 높은 값 찾기
        Arrays.sort(priorities);
        int size = priorities.length-1;

        while(!queue.isEmpty()){
            Integer i = queue.poll();
            if(i == priorities[size - answer]){
                answer++;
                location--;
                if(location <0)
                    break;
            }else{
                queue.add(i);
                location--;
                if(location<0)
                    location=queue.size()-1;
            }
        }

        return answer;
    }
    
    public static void main(String[] args) {
		Solution s = new Solution();
		int[] priorities = {1,1,9,1,1,1};
		System.out.println(s.solution(priorities, 5));
	}
}