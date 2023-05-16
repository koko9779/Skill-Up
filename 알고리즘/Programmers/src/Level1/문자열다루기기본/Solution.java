package Level1.문자열다루기기본;

public class Solution {
    public boolean solution(String s) {
        char[] temp = s.toCharArray();
        boolean answer = true;
        if(temp.length!=4 && temp.length!=6){
            return false;
        }
        for(int i=0;i<temp.length;i++){
            if(!(temp[i]>='0'&&temp[i]<='9')){
                answer = false;
                return answer;
            }
        }        
        return answer;
    }
}