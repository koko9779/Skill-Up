package Level1.모의고사;

import java.util.ArrayList;
import java.util.List;

public class Solution {
	//완전탐색: 가능한 방법을 전부 만들어 보는 알고리즘 > 컴퓨터의 빠른 속도 이용
    public int[] solution(int[] answers) {
        int[] answer = {};
        int[] p1 = {1,2,3,4,5};
        int[] p2 = {2,1,2,3,2,4,2,5};
        int[] p3 = {3,3,1,1,2,2,4,4,5,5};
        
        int answer1=0, answer2=0, answer3=0;
        
        for (int i = 0; i < answers.length; i++) {
			if(p1[i%p1.length]==answers[i]) answer1++;
			if(p2[i%p2.length]==answers[i]) answer2++;
			if(p3[i%p3.length]==answers[i]) answer3++;
		}
        
        int max = Math.max(Math.max(answer1, answer2), answer3);
        
        List<Integer> list = new ArrayList<Integer>();

        if(max==answer1) list.add(1);			
        if(max==answer2) list.add(2);			
        if(max==answer3) list.add(3);	
        
        answer = new int[list.size()];
        
        for (int i = 0; i < answer.length; i++) {
			answer[i] = list.get(i);
		}
        
        return answer;
    }
}