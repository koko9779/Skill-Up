package Level2.소수만들기;

/*
 * 문제
 * 주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다.
 * 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, nums에 있는 숫자들 중 서로 다른
 * 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution함수를 완성해주세요.
 * 
 */
public class Solution {
    public int solution(int[] nums) {
        int answer = 0;
        boolean check = false;
        
        for (int i = 0; i < nums.length; i++) {
			for (int j = i+1; j < nums.length; j++) {
				for (int k = j+1; k < nums.length; k++) {
					int num = nums[i]+nums[j]+nums[k];
					if(num >= 2) check = decimalCheck(num);
					if(check == true) answer ++;
				}
			}
		}
        
        
        
        return answer;
    }
    public boolean decimalCheck(int num) {
    	boolean check = true;
    	if(num==2) return check;
    	for (int i = 2; i <num; i++) {
			if(num%i==0) {
				check = false;
				break;
			}
		}
    	return check;
    }
    public static void main(String[] args) {
    	int[] nums = {1,2,3,4};
		System.out.println(new Solution().solution(nums));
	}
}
