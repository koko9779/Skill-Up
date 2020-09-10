package Level2.다음큰숫자;

public class Solution {
	public int solution(int n) {
		
		//n의 2진수일 때 1 개수
		int a = Integer.bitCount(n);
		int compare = n+1;
		
		while(true) {
			if(Integer.bitCount(compare)==a)break;
			compare++;
		}
		return compare;
	}
	
//	내 풀이
	
//	public int solution(int n) {
//		//2진수로 변환
//		String binaryString = Integer.toBinaryString(n);
//		String[] array = new String[binaryString.length()];
//		array = binaryString.split("");
//		
//		//n의 1 개수
//		int ncnt = 0;
//		
//		for (int i = 0; i < array.length; i++) {
//			if(Integer.parseInt(array[i])==1) ncnt++;
//		}
//		
//		int result = n;
//		int rcnt = 0;
//		do{
//			rcnt = 0;
//			result ++;
//			String next = Integer.toBinaryString(result);
//			String[] nextArray = new String[next.length()];
//			nextArray = next.split("");
//			for (int i = 0; i < nextArray.length; i++) {
//				if(Integer.parseInt(nextArray[i])==1) rcnt++;
//			}
//			
//			
//		}while(ncnt!=rcnt);
//		
//		return result;
//	}
	public static void main(String[] args) {
		System.out.println(new Solution().solution(15));
	}
}
