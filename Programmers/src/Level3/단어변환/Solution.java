package Level3.단어변환;

public class Solution {
	static int MIN;
    public int solution(String begin, String target, String[] words) {
        MIN = Integer.MAX_VALUE;
        boolean[] visit = new boolean[words.length];
        if(containTaget(words, target)) {
        dfs(begin, target, visit, words, 0);
        }else {
        	MIN = 0;
        }
        return MIN;
    }
	private void dfs(String begin, String target, boolean[] visit, String[] words, int cnt) {
    	if(begin.equals(target)) {
    		MIN = MIN > cnt ? cnt: MIN;
    		return;
    	}
    	for (int i = 0; i < words.length; i++) {
			if(!visit[i] && conversion(begin,words[i])) {
				visit[i] = true;
				dfs(words[i], target, visit, words, cnt+1);
				visit[i] = false;
			}
		}
	}
	private boolean conversion(String origin, String target) {
		int cnt = 0;
		for (int i = 0; i < origin.length(); i++) {
			if(origin.charAt(i) == target.charAt(i)) cnt ++;
		}
		return cnt >= origin.length()-1 ? true : false;
	}
	private boolean containTaget(String[] words, String target) {
		for (int i = 0; i < words.length; i++) {
			if(words[i].equals(target)) {
				return true;
			}
		}
		return false;
	}
	public static void main(String[] args) {
    	String begin ="hit";
    	String target = "cog";
    	String[] words = {"hot", "dot", "dog", "lot", "log", "cog"};
    	
		int answer = new Solution().solution(begin, target, words);
		System.out.println(answer);
	}
}
