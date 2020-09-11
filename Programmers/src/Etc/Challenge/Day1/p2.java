package Etc.Challenge.Day1;

public class p2 {

	public int[] solution(int n) {
		
		int arr[][] = new int[n][n]; // 입력받은 크기의 배열 생성
		int x = -1, y = 0; 		 // arr[0][0]에 넣기 위해 '-1'로 초기화
		int num = 1; 				 // 출력할 수
		
        //총 개수 : n!
        int len = 0;
        for (int i = 1; i <= n; i++) {
			len += i;
		}
        int[] answer = new int[len];
        
		for (int i = 0; i < n; ++i) {
			for (int j = i; j < n; ++j) {
				if (i % 3 == 0) { // 높이, 밑변, 대각선  순서대로 이동하는 규칙을 활용
					x++;
				} else if (i % 3 == 1) { 
					y++;
				} else if (i % 3 == 2) { 
					x--; // x,y의 각각 감소를 통한 대각선 이동
					y--;
				}
				arr[x][y] = num++;

			} 
		} 
		String str = "";
		for (int i = 0; i < n; i++) {
			for (int j = 0; j <= i; ++j) { 
				answer[i] = arr[i][j];
				str += answer[i]+" ";
			}
		}			
		System.out.println(str);
		String[] temp = str.split(" ");
		for (int i = 0; i < temp.length; i++) {
			try {
				answer[i] = Integer.parseInt(temp[i]);
			} catch (Exception e) {
			}
		}
		
		return answer;
	}
	public static void main(String[] args) {
		new p2().solution(4);
	}

}