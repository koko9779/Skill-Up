package Level2.기능개발;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        //배포
        Queue<Integer> queue = new LinkedList<Integer>();
        
        //작업속도가 각자 얼마나 걸리는지
        for (int i = 0; i < progresses.length; i++) {
        	int sec = 0;
			while(progresses[i]<100) {
				progresses[i] += speeds[i];
				sec ++;
			}
			queue.offer(sec);
		}
        System.out.println("queue"+queue);
        
        //각 배포마다 몇 개의 기능이 배포되는지
        List<Integer> list = new ArrayList<Integer>();
        int compare = queue.poll();
        int count = 1;
        while(!queue.isEmpty()) {
        	int cur = queue.poll();
        	if(compare>=cur) {
        		count++;
        	}else {
        		list.add(count);
        		count = 1;
        		compare = cur;
        	}
		}
        list.add(count);
        
        int[] answer = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
			answer[i] = list.get(i);
		}
        
        return answer;
    }
}
