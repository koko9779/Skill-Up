package Level2.N개의최소공배수;
//최소공배수=두수의곱/두수의최대공약수
public class Solution {
    public int solution(int[] arr) {
        int lcm1 = arr[0];
        for (int i = 0; i < arr.length; i++) {
			lcm1 = lcm(lcm1,arr[i]);
		}
        return lcm1;
    }
    static int gcd(int a, int b) {
    	while(b!=0) {
    		int r = a%b;
    		a = b;
    		b = r;
    	}
    	return a;
    }
    static int lcm(int a, int b) {
    	return a*b/gcd(a,b);
    }
    public static void main(String[] args) {
    	int[] arr = {2,6,8,14};
		System.out.println(new Solution().solution(arr));
	}
}
