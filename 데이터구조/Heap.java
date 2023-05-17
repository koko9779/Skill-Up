/**
 * 힙 (Heap)
 * :완전 이진 트리의 일종으로 우선순위 큐를 위하여 만들어진 자료구조
 *  여러 개의 값들 중에서 최댓값이나 최솟값을 빠르게 찾아내도록 만들어진 자료구조
 *
 * 반정렬 상태(느슨한 정렬상태)
 * -큰 값이 상위 레벨에 있고 작은 값이 하위 레벨에 있다는 정도
 * -간단히 말하면 부모 노드의 키 값이 자식 노드의 키 값보다 항상 큰(작은) 이진 트리를 말한다
 *
 * 힙은 중복된 값을 허용한다. (이진 탐색 트리는 중복된 값 허용 X)
 *
 * 힙의 종류
 * -최대 힙 (max heap) : 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진 트리
 * -최소 힙 (min heap) : 부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전 이진 트리
 *
 * 힙의 구현
 * -배열
 * -첫 번째 인덱스 0은 사용 X
 * -힙에서 부모 노드와 자식 노드의 관계 :
 *  a.왼쪽 자식의 인덱스 = (부모의 인덱스) * 2
 *  b.오른쪽 자식의 인덱스 = (부모의 인덱스) * 2 + 1
 *  c.부모의 인덱스 = (자식의 인덱스) / 2
 */
public class Heap {

    //힙을 만드는 함수
    private static void heapify(int[] arr, int parentIdx, int lastIdx){
        int largestIdx = parentIdx;
        


    }

    private static int getParent(int[] arr, int child){
        return arr[child / 2];
    }

    private static int getLeftChild(int[] arr, int parent){
        return arr[parent * 2];
    }

    private static int getRightChild(int[] arr, int parent){
        return arr[parent * 2 + 1];
    }

    private static void swap(int[] arr, int i, int j){
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
