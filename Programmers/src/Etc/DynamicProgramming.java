package Etc;
/*문제
 *격자상의 경로
 *
 * n*n 격자가 있을 때 왼쪽 위부터 오른쪽 아래까지 갈 때에
 * 가장 최적의 경로(최댓값을 갖는)를 찾는 문제
 * (방향은 오직 오른쪽과 아래로만 가능)
 * 
 * 풀이법
 * 1. 부분 문제를 정의한다.
 * 2. 재귀적 구조를 활용할 수 있는 점화식을 만든다.
 * 3. 작은 문제를 해결한 방법으로 문제 전체를 해결한다.
 * 
 * ----------------------------------------------------
 * 풀이법 적용
 * 1. 왼쪽 위(0,0) 오른쪽 아래(4,4)로 하는 좌표를 기준으로 sum이라는 새로운 2차원 배열을 만든다.
 *    새로 만들어진 sum에는 (y,x) 좌표까지의 최댓값을 저장한다.
 * 2. sum(y,x)는 sum(y,x-1)이나 sum(y-1,x)중에 큰 값을 골라서 
 *    원래 격자에 주어진 (y,x)값을 더하면 (y,x) 좌표까지의 최댓값이 구해진다.
 *    점화식 : sum(y,x) = max(sum(y,x-1),sum(y-1,x)) + value(y,x)
 * 3. 이중 for문으로 1부터 배열 길이 만큼 sum 배열을 채워 넣으면 sum(n,n)의 값을 구할 수 있다.
 */
public class DynamicProgramming {
	public int solution(int[][] value) {
		int[][] sum = new int[value.length][value[0].length];
		//처음 값은 동일하다.
		sum[0][0] = value[0][0];
		
		int colSum = sum[0][0];
		int rowSum = sum[0][0];
		
		for (int i = 1; i < value.length; i++) {
			colSum += value[i][0];
			sum[i][0] = colSum;
		}
		for (int i = 1; i < value.length; i++) {
			rowSum += value[0][i];
			sum[0][i] = rowSum;
		}
		for (int y = 1; y < value.length; y++) {
			for (int x = 1; x < value[0].length; x++) {
				if(sum[y][x-1] > sum[y-1][x]) {
					sum[y][x] = sum[y][x-1] + value[y][x];
				}else {
					sum[y][x] = sum[y-1][x] + value[y][x];
				}
			}
		}

		return sum[value.length-1][value[0].length-1];
		
	}
	public static void main(String[] args) {
		int[][] arr = {{3,7,9,2,7},{9,8,3,5,5},{1,7,9,8,5},{3,8,6,4,10},{6,3,9,7,8}};
		int result = new DynamicProgramming().solution(arr);
		System.out.println(result);
	}
}
