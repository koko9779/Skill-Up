package Level2.위장;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

//경우의 수 : 1벌만 입었을 때 + 조합해서 입었을 때
//			(= 모든 의상의 수 + (종류*종류*종류..))
public class Solution {
    public int solution(String[][] clothes) {
        int answer = 1;
        HashMap<String, Integer> map = new HashMap<>();
        
        //의상 종류별로 분리, 개수 측정
        for (int i = 0; i < clothes.length; i++) {
			if(map.containsKey(clothes[i][1])) {
				map.replace(clothes[i][1], map.get(clothes[i][1])+1);
			}else {
				map.put(clothes[i][1], 1);
			}
		}
        
        //HashMap은 arrayList와 같이 index가 정해져 있지 않다.
        //그래서 Set자료구조에 key를 보관한 객체가 있기 때문에
        //Set객체를 통해서 key를 가져오는 방법을 선택한다.
        Set<String> keyset = map.keySet();
        
        //종류*종류*종류 (단,0개일 때 포함)
        for(String key: keyset) {
        	answer *= map.get(key)+1;
        }

        //아무것도 안입는 경우의 수 제거
        return answer-1;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		String[][] clothes = {{"yellow_hat","headgear"},{"blue_sunglasses","headgear"},{"green_turban","headgear"}};
		int answer = s.solution(clothes);
		System.out.println(answer);
	}
}
