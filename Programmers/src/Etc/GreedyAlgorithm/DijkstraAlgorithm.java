package Etc.GreedyAlgorithm;

/**
 * 다익스트라 알고리즘
 * : 그래프 내의 한 정점에서 다른 정점으로 가는 최단 경로를 구하는 알고리즘
 *
 * 방법)
 * 1. 각 정점 위에 시작점으로부터 자신에게 이르는 경로의 길이를 저장할 곳을 정의하고,
 *    모든 정점 위에 있는 경로의 길이를 무한대(∞)로 초기화한다.
 * 2. 시작 정점의 길이를 0으로 초기화하고, 최단 경로에 추가한다.
 * 3. 최단 경로에 새로 추가된 정점의 인접 정점들에 대해 경로 길이를 갱신하고
 *    이들을 최단 경로에 추가한다.
 *    (만약 추가하려는 인접 정점이 이미 최단 경로위에 있는 정점이라면, 
 *     갱신하려는 경로의 길이가 더 짧은 경우에만
 *     기존의 경로를 현재 정점을 경유하게 수정한다.)
 * 4. 그래프 내의 모든 정점이 최단 경로에 속할 때까지 3의 과정을 반복한다.
 * 
 * --> But, 최적의 해를 보장하진 못한다.
 *     그래서 이 알고리즘을 개선해서 사이클이 없는 경우
 *     무조건 최적의 해를 보장하지만 실행시간을 조금 포기해야하는
 *     알고리즘이 있다.
 * 
 * 방법)
 * 1. 시작 정점에서 도달가능한 정점들에 대해 경로의 길이를 설정하고
 *    나머지 정점들까지의 거리는 무한대(∞)로 초기화한다.
 * 2. 제일 가까운 경로의 정점을 하나 선택한다.
 * 3. 시작점에서 출발하여 결정된 최단거리 정점들을 제외한 모든 정점들을 경유해서
 *    선택한 점까지 도달하는 거리를 체크한다.
 *    기존의 경로보다 짧을 경우 갱신한다.
 * 4. 2~3을 n-1번 반복한다.
 */

import java.util.PriorityQueue;
import java.util.Scanner;


class Element implements Comparable<Element>{
    private int index;
    private int distance;
    
    Element(int index, int distance){
        this.index = index;
        this.distance = distance;
    }
    
    public int getIndex(){
        return index;
    }
    
    public int getDistance(){
        return distance;
    }
    
    //경로의 길이로 크기 비교
    public int compareTo(Element o){
        return distance <= o.distance ? -1 : 1;
    }
}
 
public class DijkstraAlgorithm {
    static int[] dist;				//시작 정점 ~ 목적 정점 최단거리
    static int[][] ad;				//시작간선과 끝간선 사이의 가중치
    static int nV, nE;				//정점의 개수, 간선의 개수
    static final int inf = 100000;	//무한대 대신
    

    public static void ssp(int start){
        PriorityQueue <Element> q = new <Element> PriorityQueue();
        dist[start] = 0;
        q.offer(new Element(start, dist[start]));		//정점(index),경로의 길이
        
        //큐가 비어있지 않다면
        while(!q.isEmpty()){
            int cost = q.peek().getDistance();			//가장 적은 경로의 길이
            int here = q.peek().getIndex();				//가장 적은 경로의 정점
            q.poll();									//가장 적은 경로의 길이를 가진 Element 뽑아내기
            
            //최단거리가 완성됐을 경우
            if(cost > dist[here]) continue;					
            System.out.print(here);
            
            //새로운 경로가 더 작으면
            for(int i = 0; i <= nV; i++){
                if(ad[here][i] != 0 && dist[i] > dist[here] + ad[here][i]){
                    dist[i] = dist[here] + ad[here][i];	//최단 경로의 값을 바꿔준다
                    q.offer(new Element(i, dist[i]));	//큐 갱신	
                }
            }
                    
        }
        System.out.println();
        for(int i =1 ; i <= nV; i++){
            System.out.print(dist[i]);
        }
    }

    public static void main(String[] args){
        Scanner scan = new Scanner(System.in);
        
        PriorityQueue<Element> q = new <Element> PriorityQueue();
        
        nV = scan.nextInt();			//정점의 개수
        nE = scan.nextInt();			//간선의 개수
        
        dist = new int[nV+1];
        ad = new int[nV+1][nV+1];
        
        //정점들에게 무한대와 같이 큰 값을 넣어준다
        for(int i = 0; i <= nV; i++){
            dist[i] = inf;
        }
        
        
        for(int i = 0; i < nE; i++){
            int t1 = 0;
            int t2 = 0;
            int t3 = 0;
            
            t1 = scan.nextInt();		//간선의 시작
            t2 = scan.nextInt();		//간선의 끝
            t3 = scan.nextInt();		//가중치
            
            ad[t1][t2] = t3;
        }
        ssp(1);
        
    }
}

