package Level2.예상대진표;

import java.util.ArrayList;
import java.util.List;

/*
 * 문제
 * 토너먼트 형식의 게임대회
 * 1vs2, 3vs4, 5vs6, ... n-1vsn
 * 라운드가 끝나면
 * 승자에겐 게임횟수 index 값이 부여됨 (ex. n번째 게임 : n)
 * 게임은 최종 한명이 남을 때까지 진행
 * 
 * 매개변수
 * : 게임 참가자 수 N, 참가자 번호 A, 경쟁자 번호 B
 * 
 * 리턴
 * : 참가자 A가 참가자 B와 몇 번째 라운드에서 만나게 되는지
 * (단, A와 B는 서로 붙게 되기 전까지 항상 이긴다)
 */
public class Solution {
    public int solution(int n, int a, int b)
    {
        int answer = 1;
        int left = 0;	//a, b 중에 숫자가 작은 쪽
        int right = 0;	//a, b 중에 숫자가 큰 쪽
        
        if(a>b) {
        	left = b;
        	right = a;
        }else {
        	left = a;
        	right = b;
        }
        
        while(true) {
        	//left가 홀수이고, left와 right 차이가 1이면 만난다.
        	if(left%2!=0 && right-left==1) {
        		break;
        	}
        	left = (left+1)/2;
        	right = (right+1)/2;
        	answer ++;
        }

        return answer;
    }
    public static void main(String[] args) {
    	
    	int n = 8;		// 게임 참가자 수
    	int a = 4;		// A 참가자 번호
    	int b = 7;		// B 참가자 번호
    	
		int answer = new Solution().solution(n, a, b);
		System.out.println(answer);
	}
}
