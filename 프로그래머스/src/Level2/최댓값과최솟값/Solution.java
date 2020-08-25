package Level2.최댓값과최솟값;

public class Solution {
    public String solution(String s) {
        String[] nums = new String[s.length()];
        nums = s.split(" ");
        
        int max = Integer.parseInt(nums[0]);
        int min = Integer.parseInt(nums[0]);
        for (int i = 1; i < nums.length; i++) {
			if(min>Integer.parseInt(nums[i])) {
				min = Integer.parseInt(nums[i]);
			}
			if(max<Integer.parseInt(nums[i])) {
				max = Integer.parseInt(nums[i]);
			}
		}
        
        return min + " " + max;
    }
}
