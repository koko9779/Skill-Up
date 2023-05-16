package Etc.Algorithm.Sort;

public class HeapSort {
	public void heapSort(int[] array) {
		int n = array.length;
		
		//일반 배열을 힙으로 구성하기
		//배열의 길이의 절반(내림)기준으로 부모의 자식노드 비교 (자식노드 계산식 때문에)
		for (int i = n/2-1; i >= 0; i--) {
			heapify(array, n, i);	//최대힙 구성
		}
		
		//요소가 하나 제거된 후 다시 최대 힙을 구성
		for (int i = n-1; i > 0; i--) {
			swap(array, 0, i);	//root노드와 마지막값 변경
			heapify(array, i, 0);	//최대힙 구성
		}
	}
	public void heapify(int array[], int n, int i) {
		int p = i;		//부모노드
		int l = i*2+1;	//왼쪽 자식노드
		int r = i*2+2;	//오른쪽 자식노드
		
		//부모 < 자식
		
		//left childNode 
		if(l<n && array[p]<array[l]) {
			p=l;
		}
		
		//right childNode
		if(r<n && array[p]<array[r]) {
			p=r;
		}
		
		//parentNode < childNode
		if(i != p) {
			swap(array, p, i);		//배열의 부모.자식노드값 교환
			heapify(array, n, p);	//변경된 p값을 기준으로 heapify
		}
	}
	public static void swap(int[] array, int a, int b) {
	    int temp = array[a];
	    array[a] = array[b];
	    array[b] = temp;
	}
	
	public static void main(String[] args) {
		HeapSort h = new HeapSort();
	    int[] array = { 230, 10, 60, 550, 40, 220, 20 };
	    
	    h.heapSort(array);
	 
	    for (int v : array) {
	        System.out.println(v);
	    }

	}
}
