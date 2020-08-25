package Level2.카펫;

public class Solution {
    public int[] solution(int brown, int yellow) {
        
        int width = 0;
        int height = 0;
        
        // yellow/2+1까지만 탐색하면 된다.
        for (int i = 1; i <= yellow/2+1; i++) {
			width = i;
			//yellow/width = height?
			height = (yellow%i==0)? yellow/i : yellow/i+1;
			
			// brown = yellow가로 * 2 + yellow세로*2+4;
			if(brown == width * 2 + height * 2 + 4) break;
		}
        
        //가로 >= 세로
        int[] answer = {Math.max(width, height)+2, Math.min(width, height)+2};
        
        return answer;
    }
}
