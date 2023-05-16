package Level1.체육복;

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public int solution(int n, int[] lost, int[] reserve) {
    	
    	// 도난 안당한 학생 수 
    	int answer = n - lost.length;
        
    	// 도난 당한 학생들
    	List<Integer> lostList = new ArrayList<Integer>();
    	for (int i: lost) lostList.add(i);
    	
    	// 여벌이 있는 학생들
    	List<Integer> reserveList = new ArrayList<Integer>();
    	for (int i: reserve) reserveList.add(i);
    	
    	// 여벌이 있지만, 도난 당한 학생 리스트에서 제거
    	for (int i = 0; i < lostList.size(); i++) {
			for (int j = 0; j < reserveList.size(); j++) {
				if(lostList.get(i) == reserveList.get(j)) {
					lostList.remove(i);
					reserveList.remove(j);
					i--;	//다음값 비교
					answer ++;
					break;
				}
			}
		}
    	
    	// 여벌을 빌린 학생들 제외
    	for (int i = 0; i < lostList.size(); i++) {
			int lostNum = lostList.get(i);
			for (int j = 0; j < reserveList.size(); j++) {
				int reserveNum = reserveList.get(j);
				if(lostNum == reserveNum -1 || lostNum == reserveNum + 1) {
					reserveList.remove(j);
					answer ++;
					break;
				}
			}
		}
    	
        return answer;
    }

}
