package 개념정리.Recursion;

import java.util.Scanner;

/**
 *  백준 9663 문제
 *
 *  문제
 *  N-Queen 문제는 크기가 N × N인 체스판 위에 퀸 N개를 서로 공격할 수 없게 놓는 문제이다.
 *  N이 주어졌을 때, 퀸을 놓는 방법의 수를 구하는 프로그램을 작성하시오.
 */
public class NQueen {
    public static int[] arr;
    public static int N;
    public static int count = 0;

    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        N = in.nextInt();
        arr = new int[N];

        nQueen(0);
        System.out.println(count);
    }

    // depth 열에 놓을 퀸 위치 찾아놓기
    public static void nQueen(int depth){
        // 모든 원소를 다 채운 상태라면, count 증가 및 return
        // depth 가 곧 놓은 퀸의 갯수
        if(depth == N){
            count ++;
            return;
        }

        for (int i = 0; i < N; i++) {
            arr[depth] = i;
            // depth열 i행에 퀸 놓아보기 and 괜찮은 위치인지 확인

            //놓을 수 있는 위치일 경우, 재귀호출을 해서 계속 dfs 실행
            if(Possibility(depth)){
                nQueen(depth + 1);
            }
        }
    }

    public static boolean Possibility(int depth){
        // i열부터 depth열까지 확인
        for (int i = 0; i < depth; i++) {

            // 같은 행에 퀸이 놓여 있을 경우 -> false
            if(arr[depth] == arr[i]){
                return false;
            }
            // Math.abs() -> 절대값을 반환하는 함수
            // 열의 차와 행의 차가 같은 경우, 대각선 자리 -> false
            else if(Math.abs(depth - i) == Math.abs(arr[depth] - arr[i])){
                return false;
            }
        }
        return true;
    }
}
