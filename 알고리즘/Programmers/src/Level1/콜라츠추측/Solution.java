package Level1.콜라츠추측;

class Solution {
	int answer = 0;
    public int solution(int num) {
        if(num==1) {
        	return answer;
        }
        if(answer==500) {
        	return -1;
        }
        answer++;
    	if(num%2!=1) {
    		return solution(num / 2);
    	}else{
    		return solution((num * 3) + 1);
    	}        	     
    }
}
