package Etc;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;
/*
 * 방법)
 * 1. 큐에서 하나의 노드를 꺼냅니다.
 * 2. 연결 노드 중 방문하지 않은 노드를 방문하고, 차례대로 큐에 삽입합니다.
 * 3. 1~2 과정 반복
 */
public class BFS {
	static BufferedReader br;
	static BufferedWriter bw;
	static StringTokenizer st;

	static int V,E,S;					//정점의 개수 V, 간선의 개수 E, 시작 정점의 번호 S
	static int x,y;						//연결된 정점 정보 
	static ArrayList<Integer> [] graph;	//정점과 정점 사이의 관계를 나타내는 그래프
	
	static ArrayList<Integer> bfs;		//bfs 실행 결과
	
	static boolean [] visit;			//이미 방문한 정점의 정보를 담을 배열
	
	static Queue<Integer> q;
	
	
	public static void main(String[] args) throws IOException{
		
		// 1.정점의 개수, 간선의 개수, 시작 정점의 번호를 입력하시오.
	    br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));
         
        st = new StringTokenizer(br.readLine());
         
        V = Integer.parseInt(st.nextToken());
        E = Integer.parseInt(st.nextToken());
        S = Integer.parseInt(st.nextToken());
       
        
        // 각 정점의 간선으로 연결되어있는 정점들에 대한 정보를 담을 리스트를 초기화
        graph = new ArrayList[E+1];
        for (int i = 1; i <= E; i++) {
            graph[i] = new ArrayList<Integer>();
        }
        
        // 2.연결되는 양쪽에 서로에 대한 정보를 넣어줌
        for (int i = 0; i < E; i++) {
            st = new StringTokenizer(br.readLine());
            x = Integer.parseInt(st.nextToken());
            y = Integer.parseInt(st.nextToken());
            
            graph[x].add(y);
            graph[y].add(x);
        }
         
        //연결된 간선 정보를 정렬
        for (int i=1; i<=E; i++){
            Collections.sort(graph[i]);
        }
         
        bfsSol();
        
        for (int i = 0; i < bfs.size(); i++) {
            System.out.print(bfs.get(i)+ " ");
        }
	}
	
	private static void bfsSol() {
		bfs = new ArrayList<Integer>();
		visit = new boolean[E+1];
		q = new LinkedList<Integer>();
		
		q.add(S);			//시작정점을 큐에 넣어줌
		visit[S] = true;	//시작정점을 방문했다는 정보 저장
		
		//큐에 정점이 없어질 때까지 반복
		while(!q.isEmpty()) {
			
			//큐에서 정점을 poll해서 이동함
			int node = q.poll();
			bfs.add(node);
			
			//이동한 정점에서 연결된 정점들을 큐에 넣어주고, visit 배열에 체크
			for(int i : graph[node]) {
				if(!visit[i]) {
					q.add(i);
					visit[i] = true;
				}
			}
			
		}
	}
}
