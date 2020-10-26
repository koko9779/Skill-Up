package Level1.키패드누르기;
/*
 * 문제
 * 왼손 엄지손가락 : *
 * 오른손 엄지손가락 : #
 * 
 * 1. 상하좌우 이동 가능 (이동거리 : 1)
 * 2. 왼쪽 열 (1,4,7) : 왼손 엄지 사용
 * 3. 오른쪽 열 (3,6,9) : 오른손 엄지 사용
 * 4. 가운데 열 (2,5,8,0) : 현재 키패드에서 더 가까운 엄지 사용
 * 4-1. 만약 거리가 같다면 왼손잡이, 오른손잡이에 따라 판별
 * 
 * 사용한 손에 따라서 L, R 을 순서대로 이어붙여 문자열 형태로 return 해주세요.
 */
public class Solution {
	public String solution(int[] numbers, String hand) {
		int left = 10;
		int right = 12;
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < numbers.length; i++) {
			int num = numbers[i];
			if(numbers[i] == 0) {
				num = 11;
			}
			if(num == 1 || num == 4 || num == 7) {
				sb.append("L");
				left = numbers[i];
			}
			if(num == 3 || num == 6 || num == 9) {
				sb.append("R");
				right = numbers[i];
			}
			if(num == 2 || num == 5 || num == 8 || num == 0) {
				int diff = 0;
				int left_d = 0;
				int right_d = 0;
				
				diff = Math.abs(num - left);
				while((diff)%3==0) {
					
				}
				diff = Math.abs(num - right);
				
			}
			
		}
		return "";
	}
	public static void main(String[] args) {
		int[] numbers = {1,3,4,5,8,2,1,4,5,9,5};
		String hand = "right";
		String result = new Solution().solution(numbers, hand);
		System.out.println(result);
	}
}
