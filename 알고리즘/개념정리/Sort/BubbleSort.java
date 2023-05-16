package 개념정리.Sort;

/**
 * 거품 정렬
 * : 인접한 두 수의 크기를 비교하여 정렬
 *
 * 비교정렬, 제자리 정렬 에 해당한다
 *
 * 해결과정
 * 1. 앞에서부터 현재 원소와 바로 다음 원소를 비교한다
 * 2. 현재 원소가 다음 원소보다 크면 원소를 교환한다
 * 3. 다음 원소로 이동하여 해당 원소와 그 다음원소를 비교한다
 */
public class BubbleSort {
    public static void bubbleSort(int[] arr){
        bubbleSort(arr, arr.length);
    }

    public static void bubbleSort(int[] arr, int size){
        // round는 배열 크기 - 1 만큼 진행됨
        for (int i = 1; i < size; i++) {
            // 각 라운드별 비교횟수는 배열 크기의 현재 라운드를 뺀 만큼 비교함
            for (int j = 0; j < size-i; j++) {
                if(arr[j] > arr[j+1]){
                    swap(arr, j, j + 1);
                }
            }
        }
    }

    private static void swap(int[] arr, int i, int j){
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
