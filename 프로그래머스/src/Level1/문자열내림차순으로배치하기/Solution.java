package Level1.문자열내림차순으로배치하기;

import java.util.Arrays;

public class Solution {
    public String solution(String s) {
        char[] temp = s.toCharArray();
        Arrays.sort(temp);
        return new StringBuilder(new String(temp)).reverse().toString();
    }
}