package Etc.GreedyAlgorithm;

import java.util.*;

/*
 * 크루스칼 알고리즘
 * : 각 정점을 최소 비용으로 연결시키는 최소 비용 신장 트리를 만드는 대표적인 알고리즘
 * 
 * 방법)
 * 1. 각 노드의 부모 노드를 만든다.
 * 2. 가장 적은 비용의 간선을 찾고, 간선 비용을 저장한다.
 * 3. 찾은 간선에 연결된 노드 중에 가장 작은 값을 부모 노드 모두 값으로 준다.
 * 4. 그 다음으로 작은 비용이 드는 간선을 찾는다.
 * 5. 사이클 형식인지 확인한다. (사이클형식이면 break)
 * 6. 사이클이 아니라면, 간선 비용을 누적. 간선에 연결된 노드중에 작은 값을 또 부모 노두 모두에게 준다.
 * 7. 만약, 부모 노드 모두가 가장 작은 노드값을 가지게 된다면 최소 신장 트리가 완성된 것이다.
 * 8. 최소 신장 트리 간선 비용의 합을 출력한다.
 */

//두 정점과 비용을 저장 할 클래스
class Edge implements Comparable<Edge>{ 
	int node[] = new int[2];
	int distance;
	
	public Edge(int a,int b, int distance) {
		this.node[0]=a;
		this.node[1] = b;
		this.distance = distance;
	}
	
	// 각 객체들의 비용을 기준으로 정렬하기 위한 Override
	@Override
	public int compareTo(Edge o) { 
		if(this.distance < o.distance) return -1;
		else if(this.distance > o.distance) return 1;
		return 0;
	}
	
}

// 기본적인 Union - Find 알고리즘에 사용되는 메소드들은 그대로 사용한다.
public class KruskalAlgorithm {
	
	public static int getParent(int[] arr,int x) {
		if(arr[x] == x) return x; // 자기 자신이 부모일 경우
		return arr[x] = getParent(arr,arr[x]);
	}
	
	public static void unionParent(int[] arr,int a,int b) {
		a = getParent(arr,a);
		b = getParent(arr,b);
		
		if(a<b) arr[b] = a;
		else arr[a] = b;	
	}
	
	public static int findParent(int[] arr,int a, int b) {
		a = getParent(arr,a);
		b = getParent(arr,b);
		
		if(a==b) return 1;
		else return 0;
	}
	public static void main(String[] args) {
		int v=7; // 노드의 수
		int e=11; // 간선의 수 
		
		// 객체를 ArrayList를 이용하여 저장
		ArrayList<Edge> arr = new ArrayList<>(); 
		arr.add(new Edge(1,7,12));
		arr.add(new Edge(1,4,28));
		arr.add(new Edge(1,2,67));
		arr.add(new Edge(1,5,17));
		arr.add(new Edge(2,4,24));
		arr.add(new Edge(2,5,62));
		arr.add(new Edge(3,5,20));
		arr.add(new Edge(3,6,37));
		arr.add(new Edge(4,7,13));
		arr.add(new Edge(5,6,45));
		arr.add(new Edge(5,7,73));
		arr.add(new Edge(1,7,12));
		
		Collections.sort(arr); // 위에서 Override한 기준으로 ArrayList 정렬 수행
		
		int parent[] = new int[v]; // Uinon - Find 알고리즘에서 사용한 부모 정점 저장 배열
		int sum =0; // 총 소모 비용
		for(int i=0;i<parent.length;i++) { // 최초 부모 노드 상태
			parent[i] = i;
		}
        
		for(int i=0;i<arr.size();i++) {
            //객체에 저장되어있는 두 정점에서 사이클이 있는지 확인
            //-1을 해주는 이유는 전달되는 parent 배열이 7의 크기를 가지므로, 
            // 1씩 밀려서 인덱스를 사용 ex) 1번 정점은 0번 인덱스
            // 사이클이 발생하지 않는다면,
			if(findParent(parent,arr.get(i).node[0]-1,arr.get(i).node[1]-1)==0) {
				sum+=arr.get(i).distance; // 총 소모비용
				unionParent(parent,arr.get(i).node[0]-1,arr.get(i).node[1]-1);
                // 두 정점을 연결
			}
		}
		System.out.println(sum);
	}

}