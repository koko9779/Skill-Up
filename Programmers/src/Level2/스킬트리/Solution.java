package Level2.스킬트리;

import java.util.LinkedList;
import java.util.Queue;

public class Solution {
    public int solution(String skill, String[] skill_trees) {
        int answer = 0;
        Queue<Character> skills;
        
        for (int i = 0; i < skill_trees.length; i++) {
        	//확인할 skill tree
        	String skill_tree = skill_trees[i];
        	
        	//선행스킬 초기화
        	skills = new LinkedList<Character>();
        	for (int j = 0; j < skill.length(); j++) {
        		skills.offer(skill.charAt(j));
        	}
        	
        	boolean check = true;
        	
			for (int j = 0; j < skill_tree.length(); j++) {
				//선행스킬인 경우
				if(skills.contains(skill_tree.charAt(j))){
					//첫번째 순서인 경우
					if(skills.peek()==skill_tree.charAt(j)) {
						skills.poll();
					}
					//아닌 경우
					else {
						check = false;
						break;
					}
				}
			}
			if(check) {
				answer ++;
			}
		}
        
        return answer;
    }
}
