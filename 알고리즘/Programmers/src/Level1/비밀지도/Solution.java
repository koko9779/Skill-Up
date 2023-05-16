package Level1.비밀지도;

public class Solution {
	public String[] solution(int n, int[] arr1, int[] arr2) {
        String[] answer = new String[n];
        for (int i = 0; i < answer.length; i++) {
			answer[i] = convertToString(arr1[i], arr2[i], n);
		}
        return answer;
    }

	private String convertToString(int i, int j, int n) {
		String answer = "";
		
		String x = Integer.toBinaryString(i);
		String y = Integer.toBinaryString(j);
		
		while(n - x.length() != 0) {
			x = "0" + x;
		}
		while(n - y.length() != 0) {
			y = "0" + y;
		}
		
		for (int k = 0; k < x.length(); k++) {
			if(x.charAt(k) == y.charAt(k)) {
				if(x.charAt(k) == '1') {
					answer += "#";
				}else {
					answer += " ";
				}
			}else {
				answer += "#";
			}
		}
		return answer;
	}
	public static void main(String[] args) {
		int n = 5;
		int[] arr1 = {9,20,28,18,11};
		int[] arr2 = {30,1,21,17,28};
		System.out.println(new Solution().solution(n, arr1, arr2));
	}
}
