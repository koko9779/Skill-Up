package Level1.소수찾기;
import java.util.Scanner;

//에라토스테네스의 체 알고리즘
//:제곱근을 이용한 소수를 구하는 방법

public class Solution {
	
	// 입력받은 숫자까지의 소수를 계산하는 메소드
    public static int getCount(int n) {
    	
        int[] arr = new int[n + 1];
        int c = 0;
        
        // 입력받은 숫자까지의 모든 숫자들을 배열에 초기화한다.
        for (int i = 2; i <= n; i++) { 
            arr[i] = i;
        }
 
        int Sqrt = (int) Math.sqrt(n);
        
        // 제곱근 까지만 계산
        for (int i = 2; i <= Sqrt; i++) { 
        	
        	// 0으로 초기화 되어있는 숫자들은 건너뛴다.
            if (arr[i] == 0) { 
                continue;
            }
            
            //i를 제외한 i의 배수를 모두 0으로 초기화
            for (int j = i + i; j <= n; j += i) { 
            	
                arr[j] = 0; // 0이 들어있는 번지는 소수가 아니다.
            }
        }
        
        for (int i = 2; i <= n; i++) {
            if (arr[i] != 0) {
                c++;
            }
        }
        return c;
 
    }
 
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
 
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int result = getCount(n);
        System.out.println("개수 : " + result);
 
        long end = System.currentTimeMillis();
        System.out.println("수행시간 : " + (end - start) / 1000.0);
    }
}
