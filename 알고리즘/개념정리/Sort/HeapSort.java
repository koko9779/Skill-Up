package 개념정리.Sort;

import java.util.*;
import java.util.stream.IntStream;

/**
 * 힙 정렬
 * :완전 이진 트리의 일종으로 우선 순위 큐를 위하여 만들어진 자료구조
 *  최댓값, 최솟값을 쉽게 추출할 수 있는 자료구조
 *
 * 특징
 * 정점 : 시간복잡도가 좋은편, 전체 자료를 정렬하는 것이 아니라 가장 큰 값 몇개만 필요할 때 가장 유용
 *
 * 시간복잡도
 * 힙을 재정비하는 데 걸리는 시간 : log₂n (완전 이진 트리 이므로)
 * 요소의 개수 : n
 * => T(n) = O(nlog₂n)
 *
 * a.최대 힙의 삽입
 *   1.힙에 새로운 요소를 마지막 노드에 이어서 삽입한다
 *   2.새로운 노드를 부모 노드들과 교환해서 힙의 성질을 만족시킨다
 * b.최대 힙의 삭제
 *   1.최대 힙에서 최댓값은 루트 노드이므로 루트 노드가 삭제된다
 *     (최대 힙에서 삭제 연산은 최댓값을 가진 요소를 삭제하는 것이다)
 *   2.삭제된 루트 노드에는 힙의 마지막 노드를 가져온다
 *   3.루트노트부터 비교해서 힙을 재구성
 */
public class HeapSort {
    private static int N = 5;
    public static void main(String[] args) {
        Random random = new Random();
        int[] arr = IntStream.range(0, N).map(i -> random.nextInt()).toArray();
        
        System.out.println("정렬 전 original 배열: ");
        for (int val : arr) System.out.print(val + " ");

        PriorityQueue<Integer> heap = init(false);
        add(heap, arr);

        //힙에서 우선순위가 가장 높은 원소(root노드)를 하나씩 뽑는다
        for (int i = 0; i < arr.length; i++) arr[i] = heap.poll();

        System.out.print("\n 정렬 후 배열 : ");
        for (int val : arr) System.out.print(val + " ");
    }
    
    private static PriorityQueue init(boolean isDecending){
        PriorityQueue<Integer> pq = null;
        if(isDecending) pq = new PriorityQueue<>(Collections.reverseOrder());
        else pq = new PriorityQueue<>();
        return pq;
    }

    private static void add(PriorityQueue pq, int[] arr){
        //배열을 힙으로 만들기
        Arrays.stream(arr).boxed().forEach(pq::add);
    }
    
    private static int delete(PriorityQueue pq){
        int remove = (int) pq.remove();
        return remove;
    }
}
