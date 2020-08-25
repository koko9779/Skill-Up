package Level1.이천십육년;

public class Solution {
    public String solution(int a, int b) {
        String answer = "";
        int totalDay = 0;
        int dayOfMonth = 0;
        for (int i = 0; i < a; i++) {
			if(i==1 || i==3 || i==5 || i==7 || i==8 || i == 10 || i==12) dayOfMonth = 31;
			else if(i==2) dayOfMonth = 29;
			else dayOfMonth = 30;
			totalDay += dayOfMonth;
		}
        totalDay += b;
        
        switch (totalDay%7) {
		case 1:
			answer = "FRI";
			break;
		case 2:
			answer = "SAT";
			break;
		case 3:
			answer = "SUN";
			break;
		case 4:
			answer = "MON";
			break;
		case 5:
			answer = "TUE";
			break;
		case 6:
			answer = "WED";
			break;
		case 0:
			answer = "THU";
			break;
		default:
			break;
		}
        
        return answer;
    }
}
