package Level1.약수의합;

public class Solution {
	  public int solution(int n) {
	      int answer = 0;
	      //n/2보다 큰 수로는 나누어 떨어지지 않기 때문에 n/2까지 돌린다
	      for(int i =1; i<=n/2; i++){
	          answer += n%i==0 ? i : 0;
	      }
	      answer +=n;
	      return answer;
	  }
    public static void main(String[] args) {
		Solution s = new Solution();
		int answer = s.solution(5);	//정답:6
		System.out.println(answer);
	}
}