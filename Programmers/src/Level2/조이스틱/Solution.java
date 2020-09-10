package Level2.조이스틱;

//주의: 왼쪽거리=오른쪽 거리 일 때, 무조건 오른쪽으로 이동
public class Solution {
    public int solution(String name) {
    	int answer = 0;
        int count = 0;		//바꿔야하는 문자 수
        char[] word = name.toCharArray();
        boolean[] check = new boolean[word.length];
        for (int i = 0; i < word.length; i++) {
			if(word[i] != 'A') {
				count++;
			}else check[i] = true;
		}
        // ex) ZABC = [false,true,false,false];
        int idx = 0;
        for(int i = 0; i < count; ++i) {
        	//check[idx]값이 변경됐거나 A인 경우: 좌우로 이동해야하는 경우
        	if(check[idx]) {
        		int lidx = idx;
        		int ridx = idx;
        		int left = 0;
        		int right = 0;
        		
        		//왼쪽으로 이동했을 때
        		while(check[lidx]) {
        			//인덱스값이 0이면
        			if(lidx == 0) lidx = word.length - 1;
        			else lidx --;
        			left ++;
        		}
        		//오른쪽으로 이동했을 때 
        		while(check[ridx]) {
        			ridx = (ridx + 1) % word.length;
        			right ++;
        		}
        		//움직임이 적은 방향으로 움직인다
        		if(left >= right) {
        			idx = ridx;
        			answer += right;
        		}else {
        			idx = lidx;
        			answer += left;
        		}
        	}
        	check[idx] = true;
        	answer += changeAlphabet(idx, word);
        }
        return answer;
    }

	private int changeAlphabet(int i, char[] word) {
		int up = word[i] - 'A';
		int down = 'Z' + 1 - word[i];
		if(up > down) {
			return down;
		}else {
			return up;
		}
		
	}
	public static void main(String[] args) {
		int answer1 = new Solution().solution("BBBAAAB");		//#9
		int answer2 = new Solution().solution("ABABAAAAABA");	//#11
		System.out.println(answer1);
		System.out.println(answer2);
	}
}
