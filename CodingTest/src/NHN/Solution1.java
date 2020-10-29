package NHN;

import java.util.Scanner;

class Solution1 {
  private static void solution(int numOfAllPlayers, int numOfQuickPlayers, char[] namesOfQuickPlayers, int numOfGames, int[] numOfMovesPerGame){

	char [] sittingPlayers = new char[numOfAllPlayers-1];	//앉아 있는 사람 배치
	int [] taggerCount = new int[numOfAllPlayers];			//술래를 해본 횟수

	char tagger = 'A';					
	int tagger_idx = 0;										//술래 index
	taggerCount[0] ++;										//술래를 해본 횟수 증가
	
	//그 사람이 빠른 사람이면 true인 배열
	boolean [] fastPlayer = new boolean[numOfAllPlayers];
	for (int i = 0; i < namesOfQuickPlayers.length; i++) {
		fastPlayer[namesOfQuickPlayers[i]-65] = true;
	}
	
	//게임 진행
	for (int i = 0; i < numOfGames; i++) {
		int goal = numOfMovesPerGame[i] + tagger_idx;		//술래가 지목한 사람의 index
		
		//시계방향으로
		if(goal >= 0) {
			goal %= sittingPlayers.length;
		}
		//반시계방향으로
		else {
			while(goal<0) {
				goal += sittingPlayers.length;
			}
		}

		//빠른 사람이 아니라면
		if(!fastPlayer[sittingPlayers[goal]-65]) {
			
			//현재 플레이 중인 사람들 배열 바꾸기
			char tmp2 = sittingPlayers[goal];
			sittingPlayers[goal] = tagger;
			tagger = tmp2;
			
			tagger_idx = goal;								//술래 변경
			taggerCount[(int)(tagger-65)] ++;				//술래 해본 횟수 증가

		}else {
			tagger_idx = goal;								//술래 변경
			taggerCount[(int)(tagger-65)] ++;				//술래 해본 횟수 증가
		}
	}
	
	System.out.println("결과는?");
	for (int i = 0; i < sittingPlayers.length; i++) {
		System.out.println(sittingPlayers[i]+" "+taggerCount[(int)(sittingPlayers[i]-65)]);
	}
	System.out.println(tagger+" "+taggerCount[(int)(tagger-65)]);
  }

  private static class InputData {
    int numOfAllPlayers;				//게임에 참여하는 사람의 수
    int numOfQuickPlayers;				//달리기가 빨라 술래에 절대 걸리지 않는 사람의 수
    char[] namesOfQuickPlayers;			//달리기가 빨라 술래에 절대 걸리지 않는 사람들의 이름
    int numOfGames;						//게임 진행 횟수
    int[] numOfMovesPerGame;			//술래가 수건을 내려 놓기 위해 이동하는 칸수
  }

  private static InputData processStdin() {
    InputData inputData = new InputData();

    try (Scanner scanner = new Scanner(System.in)) {
      inputData.numOfAllPlayers = Integer.parseInt(scanner.nextLine().replaceAll("\\s+", ""));

      inputData.numOfQuickPlayers = Integer.parseInt(scanner.nextLine().replaceAll("\\s+", ""));
      inputData.namesOfQuickPlayers = new char[inputData.numOfQuickPlayers];
      System.arraycopy(scanner.nextLine().trim().replaceAll("\\s+", "").toCharArray(), 0, inputData.namesOfQuickPlayers, 0, inputData.numOfQuickPlayers);

      inputData.numOfGames = Integer.parseInt(scanner.nextLine().replaceAll("\\s+", ""));
      inputData.numOfMovesPerGame = new int[inputData.numOfGames];
      String[] buf = scanner.nextLine().trim().replaceAll("\\s+", " ").split(" ");
      for(int i = 0; i < inputData.numOfGames ; i++){
        inputData.numOfMovesPerGame[i] = Integer.parseInt(buf[i]);
      }
    } catch (Exception e) {
      throw e;
    }

    return inputData;
  }

  public static void main(String[] args) throws Exception {
    InputData inputData = processStdin();

    solution(inputData.numOfAllPlayers, inputData.numOfQuickPlayers, inputData.namesOfQuickPlayers, inputData.numOfGames, inputData.numOfMovesPerGame);
  }
}

/**********************연수언니 풀이법***************************/
/*
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

class Person{
    int idx;
    char name;
    boolean isFast;
    int loseCnt;


    public Person(int idx, char name, boolean isFast, int loseCnt) {
        this.idx = idx;
        this.name = name;
        this.isFast = isFast;
        this.loseCnt = loseCnt;
    }

    @Override
    public String toString() {
        return name+" "+loseCnt;
    }
}
class Main {
    private static void solution(int numOfAllPlayers, int numOfQuickPlayers, char[] namesOfQuickPlayers, int numOfGames, int[] numOfMovesPerGame){
        List<Person> persons = new ArrayList<>();

        Arrays.sort(namesOfQuickPlayers);

        // setting
        int fastIdx = 0;
        for(int i=0; i<numOfAllPlayers; i++){

            char name = (char)('A'+i);
            boolean fast =  false;

            if(fastIdx < numOfQuickPlayers && name == namesOfQuickPlayers[fastIdx]){
                fast = true;
                fastIdx++;
            }
            persons.add(new Person(i, name, fast, 0));
        }

        // play
        peek = persons.remove(0);
        peek.loseCnt++;

        int start = 0;
        for(int i=0; i<numOfMovesPerGame.length; i++){
            start = play(persons, numOfMovesPerGame[i], numOfAllPlayers, start);
        }

        for(int i=0; i<persons.size(); i++){
            System.out.println(persons.get(i).toString());
        }
        System.out.println(peek.toString());

    }
    public static Person peek;
    public static int play(List<Person> persons, int move, int num, int start){
        int go = start + move;
        num--;

        if(go >= 0){        // 양수
            go %= num;
        } else {
            while(go<0){    // 음수
                go += num;
            }
        }

        Person temp = persons.get(go);
        if(temp.isFast) {       // 빠른 친구
            peek.loseCnt++;
        } else {
            persons.add(go, peek);
            persons.remove(go+1);
            peek = temp;
            peek.loseCnt++;
        }

        return go;
    }
}
*/