package Level3.멀쩡한사각형;

/*
 * 직사각형 종이가 있습니다
 * 가로 길이 : wcm
 * 세로 길이 : hcm
 * 
 * 직사각형을 대각선으로 잘라서 사용할 수 있는 정사각형의 개수를 구하시오
 * 
 * [풀이법]
 * W와 H의 최대 공약수 = g
 * 대각선이 정통으로 지나는 반복되는 사각형 가로 : w / g
 * 대각선이 정통으로 지나는 반복되는 사각형 세로 : h / g 
 * 잘라지는 사각형의 수 : g * ((w / g) + (h / g) - 1) = w + h - g
 * 
 * 결과값
 * = 전체 사각형의 개수 - 잘리는 사각형 개수 = w * h - (w + h - g) 
 * 
 */
public class Solution {
    public long solution(int w, int h) {
    	long W = (long) w;
    	long H = (long) h;
    	//전체 사각형 개수
    	long total = W * H;	
        return total - (W + H - gcd(W, H));
    }

	private long gcd(long a, long b) {
		long tmp, n;
		
		//a에 큰 값을 위치시키기 위한 조건
		if(a < b) {
			tmp = a;
			a = b;
			b = tmp;
		}
		
		//b가 0이 될 때 까지 (a%b), 반복문을 돌게하고, b가 0인 순간의 a를 gcd로 판단해서 리턴
		while(b != 0) {
			n = a % b;
			a = b;
			b = n;
		}
		
		return a;
	}
}
