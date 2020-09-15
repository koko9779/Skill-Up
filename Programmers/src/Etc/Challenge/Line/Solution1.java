package Etc.Challenge.Line;

import java.util.ArrayList;
import java.util.List;

public class Solution1 {
    public int solution(int[][] boxes) {
    	
        List<Integer> list = new ArrayList<Integer>();
      
        for (int i = 0; i < boxes.length; i++) {
			if(boxes[i][0]!=boxes[i][1]) {
				int x = boxes[i][0];
				int y = boxes[i][1];
				
				if(list.contains(x)) {
					list.remove(list.indexOf(x));
				}else {
					list.add(x);					
				}
				
				if(list.contains(y)) {
					list.remove(list.indexOf(y));
				}else {
					list.add(y);					
				}				
			}
		}
        
        
        
        return list.size()/2;
    }
    public static void main(String[] args) {
    	int[][] boxes = {{1,2},{2,1},{3,3},{4,5},{5,6},{7,8}};
		int answer = new Solution1().solution(boxes);
		System.out.println(answer);
	}
}

