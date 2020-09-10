package Level1.정수제곱근판별;

public class Solution {
    public long solution(long n) {
        if(n<0)return -1;
        double doublesqrt = Math.sqrt(n);
        int intsqrt = (int) doublesqrt;
        return doublesqrt==intsqrt? (long)Math.pow((intsqrt+1),2) : -1;
    }
}
