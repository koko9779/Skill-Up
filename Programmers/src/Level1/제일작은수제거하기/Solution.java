package Level1.제일작은수제거하기;

public class Solution {
    public int[] solution(int[] arr) {
    	
    	if(arr.length==1) {
    		int[] answer = {-1};
    		return answer;
    	}
        int[] answer = new int[arr.length-1];
        int cnt = 0;
        int low = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
			if(arr[i]<low) {
				low = arr[i];
			}
		}
        for (int i = 0; i < arr.length; i++) {
			if(arr[i]!=low) {
				answer[cnt++] = arr[i];
			}
		}
        return answer;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		int[] arr = {4,1,4,7};
		int[] arr2 = s.solution(arr);
		for (int i = 0; i < arr2.length; i++) {
			System.out.print(arr2[i]);
		}
	}
}