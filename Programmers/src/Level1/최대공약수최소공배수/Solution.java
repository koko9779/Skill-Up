package Level1.최대공약수최소공배수;

class Solution {

	//최대 공약수
	public int gcd(int n, int m) {			
		if(m == 0) return n;
		return gcd(m, n%m);		
	}
	
	//최소 공배수
	public int lcm(int n, int m){
		return n * m / gcd(n,m);
	}
		
    public int[] solution(int n, int m) {
        int[] answer = new int[2];
        
        if(n<m) {
        	int tmp = n;
        	n = m;
        	m = tmp;
        }
        
        answer[0] = gcd(n, m);
        answer[1] = lcm(n, m);
        System.out.println("min :"+answer[0]);
        System.out.println("max :"+answer[1]);
        
        return answer;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		s.solution(25,30);
	}
}
