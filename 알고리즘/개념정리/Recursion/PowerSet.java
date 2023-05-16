package 개념정리.Recursion;

import java.util.Stack;

/**
 * 멱집합
 * : 한 집합의 모든 부분집합
 *
 * -> n개의 원소를 가지고 있는 집합에서 나올 수 있는 경우의 수는 2^N가지
 * ex. {a,b,c} -> {a, b, c, ab, ac, bc, abc} + 공백 = 8가지
 *
 * 풀이법
 * 첫 번째 원소부터 포함 시키는 경우,
 *               포함 시키지 않는 경우로 나눠서 재귀하면 된다
 */
public class PowerSet {
    private static String[] inputs = {"a","b","c","d"};

    public static void main(String[] args) {
        final Stack<String> stack = new Stack<>();
        getPowerSet(stack, 0);
    }
    public static void getPowerSet(Stack<String> stack, int index){
        if(index == inputs.length){
            System.out.println(stack.toString());
        }else{
            stack.push(inputs[index]);
            getPowerSet(stack, index + 1);

            stack.pop();
            getPowerSet(stack, index + 1);
        }
    }
}
