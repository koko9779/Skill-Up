package Level2.타겟넘버;

public class Solution {
	static int answer = 0;
    public int solution(int[] numbers, int target) {
    	dfs(numbers, target, 0);
    	return answer;
    }
    
    public static void dfs(int[]numbers, int target, int node) {
    	//노드를 모두 다 거쳐갔을 때
    	if(node==numbers.length) {
    		int sum=0;
    		for(int num:numbers) {
    			sum+=num;
    		}
    		//합계가 타겟과 같으면 경우의 수 증가
    		if(sum==target) {
    			answer++;
    		}
    	}else {
    		//현재 노드의 값을 양수(1)로 변경, 다음노드값의 DFS구하기
    		numbers[node]*=1;
    		dfs(numbers, target, node+1);
    		
    		//현재 노드의 값을 음수(-1)로 변경, 다음노드값의 DFS구하기
    		numbers[node]*=-1;
    		dfs(numbers, target, node+1);
    	}
    }
}