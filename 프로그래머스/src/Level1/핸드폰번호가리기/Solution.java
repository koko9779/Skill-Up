package Level1.핸드폰번호가리기;

//뒷자리를 제외한 번호 '*'로 가리기
public class Solution {
    public String solution(String phone_number) {
        String answer = "";
        char[] pn = phone_number.toCharArray();
        for (int i = 0; i < (pn.length-4); i++) {
			pn[i] = '*';
		}
        answer = String.valueOf(pn);
        return answer;
    }
}