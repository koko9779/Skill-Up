package Naver;

import java.util.ArrayList;
import java.util.List;

public class Solution1 {
	public String solution(String m, String k) {
		String answer = "";
		char[] word = k.toCharArray();

		// m을 리스트로 만든다
		List<Character> origin = new ArrayList<Character>();
		for (int i = 0; i < m.length(); i++) {
			origin.add(m.charAt(i));
		}
		System.out.println(origin);
		int tmp = 0;
		for (int i = 0; i < word.length; i++) {
			for (int j = tmp; j < origin.size(); j++) {
				if (word[i] == origin.get(j)) {
					tmp = j;
					origin.remove(j);
					break;
				}
			}
		}
		for (int i = 0; i < origin.size(); i++) {
			answer += origin.get(i);
		}
		return answer;
	}

	public static void main(String[] args) {
		String m = "acbbcdc";
		String k = "abc";
		String result = new Solution1().solution(m, k);
		System.out.println(result);
	}
}
