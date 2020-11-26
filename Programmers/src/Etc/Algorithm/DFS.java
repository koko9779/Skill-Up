package Etc.Algorithm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

/**
 * DFS
 * (스택을 사용하는게 보통이지만, 배열을 추가로 2개 만들어야하는 등 고려사항이 많아서 비추천)
 * 
 * 풀이법
 * 인접리스트를 사용한 구현
 *
 */
public class DFS {
	
	static BufferedReader br;
	static StringTokenizer st;
	
	static int V, E;							//정점의 개수, 간선의 개수
	static int x, y;							//연결된 정점 정보
	static ArrayList<ArrayList<Integer>> graph;	//정점과 정점 사이의 관계를 나타내는 그래프
	
	static boolean[] visit;						//이미 방문한 정점의 정보를 담을 배열
	
	public static void dfs(int i) {
		visit[i] = true;
		System.out.println(i);
		
		//배열 null check
		for (int  j : graph.get(i)) {
			if(visit[j] == false) dfs(j);
		}
	}
	
	public static void main(String[] args) throws IOException {
		br = new BufferedReader(new InputStreamReader(System.in));
		st = new StringTokenizer(br.readLine());
		
        V = Integer.parseInt(st.nextToken());
        E = Integer.parseInt(st.nextToken());
        
        graph = new ArrayList(V+1);				//인접 리스트 초기화
        visit = new boolean[V+1];				//visit 배열 초기화
        
        //인접 리스트 속의 리스트 초기화
        for (int i = 0; i < V+1; i++) {
			graph.add(new ArrayList());
		}
        
        for (int i = 0; i < E; i++) {
        	st = new StringTokenizer(br.readLine());
			x = Integer.parseInt(st.nextToken());
			y = Integer.parseInt(st.nextToken());
			
			graph.get(x).add(y);
			graph.get(y).add(x);
		}
        
        dfs(1);
        
	}
}
