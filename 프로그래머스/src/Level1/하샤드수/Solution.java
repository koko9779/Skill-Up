package Level1.하샤드수;

//하샤드 수 : 양의정수 x가 x의 자릿수의 합으로 나누어 떨어져야 함
//ex. 18은 1+8=9, 9로 나누어 떨어짐
public class Solution {
    public boolean solution(int x) {
        boolean answer = true;
        int sum = 0;
        int origin = x;
        while(x!=0) {
        	sum += x%10;
        	x = x/10;
        }
        if(origin%sum!=0) answer = false;
        return answer;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		System.out.println(s.solution(11));
	}
}