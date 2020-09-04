package Level2.숫자의표현;
/**
 * 문제
 * n = x+(x-1)+(x-2)+(x-3)+...+(x-n)
 * 연속된 숫자로 만들 수 있는 n 표현 방법의 수를 구하시오.
 *
 */
public class Solution {
    public int solution(int n) {
        int answer = 0;
        for (int i = n; i > 0; i--) {
        	int sum = 0;        	
        	for (int j = i; j > 0; j--) {
				sum += j;
				if(sum==n) {
					answer++;
					break;
				}else if(sum>n) {
					break;
				}
			}
		}
        return answer;
    }
}
