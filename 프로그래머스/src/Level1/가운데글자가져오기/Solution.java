package Level1.가운데글자가져오기;

class Solution {
    String solution(String s) {
        String answer = "";
        String[] sArray;

        sArray = s.split("");      
        int mid = s.length()/2;

        if(s.length()%2==0){
            answer = sArray[mid-1]+sArray[mid];
        }else{
            answer = sArray[mid];
        }
        return answer;
    }
    static void main(String[] args) {
    	Solution aa = new Solution();
		String result = aa.solution("abcd");
		System.out.println(result);
	}
}
