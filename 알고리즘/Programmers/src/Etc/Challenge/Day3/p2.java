package Etc.Challenge.Day3;

import java.util.ArrayList;
import java.util.List;

public class p2 {
    public int[] solution(String s) {
    	
    	List<String> noOne = new ArrayList<>();
    	int size = 0;
    	int count = 0;
    	int change = 0;
    	while(!s.equals("1")) {
    		noOne.clear(); 
	    	for (int i = 0; i < s.length(); i++) {
				if(s.charAt(i) == '1') noOne.add(s.charAt(i)+"");
				else count ++;
			}
	    	size = noOne.size();
	    	s = Integer.toBinaryString(size);
	    	change ++;
    	}
    	int[] answer = {change,count};
    	return answer;
    }
}
