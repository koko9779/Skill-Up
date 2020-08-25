package Level1.자연수뒤집어배열로만들기;

public class Solution {
    public int[] solution(long n) {
        String tempStr = new String("" + n);
        //toCharArray : 문자열 문자별 배열정리
        char[] tempChar = tempStr.toCharArray();
        int[] answer = new int[tempChar.length];
        //reverse
        for(int i=0; i<tempChar.length; i++){
            answer[i] = Integer.parseInt(tempChar[tempChar.length-i-1]+"");
        }
        return answer;
    }
}