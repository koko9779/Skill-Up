package Level1.완주하지못한선수;

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public String solution(String[] participant, String[] completion) {
        String answer = "";
        Map<String, Integer> map = new HashMap<>();
        for (String string : participant) {
        	//getOrDefault: 찾는 키가 존재한다면 해당 키의 값을 반환하고, 없으면 기본값(0) 반환
        	//키값 존재시 키값+1 반환
			map.put(string, map.getOrDefault(string, 0)+1);
		}
        System.out.println(map);
        
        int val = 0;
        for (String string : completion) {
			val = map.get(string)-1;
			map.put(string, val);
		}
        System.out.println(map);
        
        for (String key : map.keySet()) {
			if(map.get(key)==1) answer = key;
		}
        
        return answer;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		String[] participant = {"marina", "josipa", "nikola", "vinko", "filipa"};
		String[] completion = {"josipa", "filipa", "marina", "nikola"};
		String answer = s.solution(participant, completion);
		System.out.println(answer);
	}
}
