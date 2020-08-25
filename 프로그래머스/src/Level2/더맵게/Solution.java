package Level2.더맵게;

import java.util.PriorityQueue;

public class Solution {
    public int solution(int[] scoville, int K) {
        int answer = 0;
        //우선순위 큐
        PriorityQueue<Integer> heap = new PriorityQueue<Integer>();
        
        for (int aScoville : scoville) {
			heap.offer(aScoville);
		}
        
        while(heap.peek() <= K) {
        	if(heap.size()==1) {
        		return -1;
        	}
        	int a = heap.poll();
        	int b = heap.poll();
        	
        	int result = a + (b * 2);
        	
        	heap.offer(result);
        	answer ++;
        }
        
        return answer;
    }
    
    public static void main(String[] args) {
		Solution s = new Solution();
		int[] scoville = {1,2,3,9,10,12};
		System.out.println("result: "+s.solution(scoville, 7));
	}
}
