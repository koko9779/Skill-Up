package Level2.다리를지나는트럭;

import java.util.LinkedList;
import java.util.Queue;

//모든 트럭이 다리를 건너기 위해서 최소 몇 초가 걸릴까요?
public class Solution {
	
	class Truck{
		int weight;
		int entry;
		public Truck(int weight, int entry) {
			this.weight = weight;
			this.entry = entry;
		}
	}
	
    public int solution(int bridge_length, int weight, int[] truck_weights) {     
    	
        Queue<Truck> waiting = new LinkedList<>();
        Queue<Truck> bridge = new LinkedList<>();
        
        for (int i = 0; i < truck_weights.length; i++) {
        	waiting.offer(new Truck(truck_weights[i],0));
        }	
        
        int time = 0;			//걸린 시간
        int totalWeight = 0;	//다리 위에 올라가있는 트럭 무게
        
        while(!bridge.isEmpty() || !waiting.isEmpty()) {
        	
        	time++;
        	
        	//다리에 트럭이 있을 때
        	if(!bridge.isEmpty()) {
        		Truck t = bridge.peek();
        		//트럭이 지나갔으면
	        	if(time - t.entry >= bridge_length) {
	        		totalWeight -= t.weight;
	        		bridge.poll();
	        	}
        	}
        	
        	//대기 트럭이 있을 때
        	if(!waiting.isEmpty()) {
        		//다리위의 트럭들 + 출발할 트럭 무게가 적으면
        		if(totalWeight + waiting.peek().weight <= weight) {
        			//트럭 출발
        			Truck t = waiting.poll();
        			//무게 추가
        			totalWeight += t.weight;
        			
        			//다리위 트럭추가
        			bridge.offer(new Truck(t.weight, time));
        		}
        	}
 
        	System.out.println("sum: "+totalWeight);
        	System.out.println("time: "+time);
        	System.out.println();
        }

        return time;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		int[] truck_weights = {7,4,5,6};
		int answer = s.solution(2, 10, truck_weights);
		System.out.println(answer);
	}
}
