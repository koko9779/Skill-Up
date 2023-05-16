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
			else if(num == 3 || num == 6 || num == 9) {
				sb.append("R");
				right = numbers[i];
			}
			else {
				int[] leftFinger = {(left/3), (left%3)};
				int[] rightFinger = {(right/3), (right%3)};
				int[] checkFinger = {(num/3), (num%3)};
				/*
				 * 열
				 * 1, 2, 0
				 * 
				 * left/right Finger = {몇번째 행, 몇번째 열};
				 */
				
				//오른손이 오른쪽에 있을 때
				if(rightFinger[1]==0) {
					//계산을 쉽게 하기 위해 좌측열과 1차이가 나게하기 위해서 3으로 치환
					rightFinger[0] = rightFinger[0] - 1;
					rightFinger[1] = 3;		
				}
		
				int ll = Math.abs(leftFinger[1]-checkFinger[1]);	//왼손이 오른쪽으로 이동하는 횟수
				int rr = Math.abs(rightFinger[1]-checkFinger[1]);	//오른손이 왼쪽으로 이동하는 횟수
				
				int leftChk = Math.abs(leftFinger[0]-checkFinger[0]) + ll;	//왼손이 움직이는 총 횟수
				int rightChk = Math.abs(rightFinger[0]-checkFinger[0]) + rr;//오른손이 움직이는 총 횟수
				
				if(leftChk > rightChk) {
					sb.append("R");
					right = num;
				}
				else if(leftChk < rightChk) {
					sb.append("L");
					left = num;
				}
				//같은 경우
				else {
					if(hand.equals("left")) {
						sb.append("L");
						left = num;
					}else if(hand.equals("right")) {
						sb.append("R");
						right = num;
					}
				}
			}
			System.out.println(left + " "+ right);
		}
		return sb.toString();
	}
	public static void main(String[] args) {
		//int[] numbers = {1,3,4,5,8,2,1,4,5,9,5};
		int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
		String hand = "right";
		String result = new Solution().solution(numbers, hand);
		System.out.println(result);
	}
}
