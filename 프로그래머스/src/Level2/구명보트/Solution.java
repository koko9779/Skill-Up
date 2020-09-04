package Level2.구명보트;

import java.util.Arrays;

/**
 * 문제
 * 구명보트는 한번에 최대 2명씩 (무게 제한 있음) 탈 수 있다
 * 구명보트를 최대한 적게 사용하여 모든 사람을 구출할 때,
 * 구출에 필요한 구명보트 개수의 최솟값을 구하시오.
 * 
 * 사람들 몸무게 배열 : people
 * 무게 제한 : limit
 * 
 * 풀이법: 최대값 + 최소값  <= 100
 *
 */
public class Solution {
    public int solution(int[] people, int limit) {
        int answer = 0;
        Arrays.sort(people);
        int i =0, j;
        //큰수부터 줄여나가는데 작은수보다 클 때만
        for (j = people.length-1; i < j; j--) {
        	//최대 혼자     -> 구명보트 1대
			if(people[i]+people[j]>limit) answer ++;
			//최소 + 최대 -> 구명보트 1대
			else {
				answer++;
				i++;
			}
		}
        if(i==j) answer++;
        
        return answer;
    }

}
