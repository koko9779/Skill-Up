package Level2.소수찾기;

import java.util.Arrays;

public class Solution {
	public static void main(String[] args) {
		System.out.println(new Solution().solution("011"));
	}
	public int solution(String numbers) {
		// 1. 주어진 숫자 조각들에서 구할 수 있는 가장 큰 값을 int형으로 반환한다
		int maxNum = makeMaxNum(numbers.toCharArray());
		
		// 2. 가장 큰 값까지의 소수를 구한다
		boolean[] primeNum = findPrimeNum(maxNum);
		
		// 3. 주어진 숫자조각으로 만들 수 있는 소수들의 개수를 구하여 반환한다
		return findMakePossiblePrimeNum(primeNum, maxNum);
	}
	
	/***********************************************************************/
	
	// 1
	private int makeMaxNum(char[] inputNum) {
		Arrays.sort(inputNum);
		int len = inputNum.length;
		
		//내림차순으로 변경
		for (int i = 0; i < len/2; i++) {
			char temp = inputNum[i];
			inputNum[i] = inputNum[len-1-i];
			inputNum[len-1-i] = temp;
		}
		return Integer.parseInt(new String(inputNum));
	}
	
	// 2 에라토스테네스의 체
	private boolean[] findPrimeNum(int maxNum) {
		boolean[] result = new boolean[maxNum+1];	// default : false;
		
		for(int i = 2; i < Math.sqrt(maxNum); i++) {
			if(!result[i]) {
				// 소수가 아닌 값 : true;
				for(int j = i * 2; j <= maxNum; j += i) {
					result[j] = true;
				}
			}
		}
		//소수=false 배열 return;
		return result;
	}
	
	// 3 
	private int findMakePossiblePrimeNum(boolean[] primeNum, int maxNum) {
		int possiblePrimeNumCount = 0;
		
		for(int primeNumIndex = 2; primeNumIndex <= maxNum; primeNumIndex++) {
			//소수인지 && 주어진 숫자 조합으로 만들 수 있는 숫자인지
			if(!primeNum[primeNumIndex] && isPossible(maxNum, primeNumIndex)) {
				possiblePrimeNumCount ++;
				//System.out.println(primeNumIndex);
			}
		}
		
		return possiblePrimeNumCount;
	}
	
	//해당 소수가 주어진 숫자 조각으로 만들어질 수 있는지 여부를 판단
	private boolean isPossible(int maxNum, int primeNum) {
		int[] numCount = countAvailableNums(maxNum);
		
		while(primeNum != 0) {
			if(numCount[primeNum % 10] <= 0) return false;
			numCount[primeNum % 10] --;
			primeNum /= 10;
		}
		
		return true;
	}
	
	//주어진 숫자조각에서 사용할 수 있는 0~9의 개수를 세기
	private int[] countAvailableNums(int maxNum) {
		char[] str = String.valueOf(maxNum).toCharArray();
		int[] numCount = new int[10];
		for(int i = 0; i < str.length; i++) {
			numCount[str[i] - '0'] ++;
		}
		return numCount;
	}
}
