package WinterCodingTest;

public class Solution1 {
	static String[] products;
	public String solution(int n, int[][] delivery) {
        StringBuffer answer = new StringBuffer();
        products = new String[n+1];
        for (int i = 1; i < products.length; i++) {
			products[i] = "?";
		}
        
        check(delivery);			
        check(delivery);			
        
        for (int i = 1; i < products.length; i++) {
			answer.append(products[i]);
		}
        return answer.toString();
    }
    public void check(int[][] delivery) {
        for (int i = 0; i < delivery.length; i++) {
			for (int j = 0; j < 3; j++) {
				//배송 됐을 때
				if(delivery[i][2] == 1) {
					products[delivery[i][0]] = "O";
					products[delivery[i][1]] = "O";
				}
				//배송 안됐을 때
				else {
					//products 상태를 확인해봐야함
					if(products[delivery[i][0]].equals("O")) {
						products[delivery[i][1]] = "X";
					}else if(products[delivery[i][1]].equals("O")) {
						products[delivery[i][0]] = "X";
					}
				}
			}
		}
    }
    
    public static void main(String[] args) {
    	int n = 7;
    	int[][] delivery = {{5,6,0},{1,3,1},{1,5,0},{7,6,0},{3,7,1},{2,5,0}};
		String answer = new Solution1().solution(n, delivery);
		System.out.println(answer);
	}
}
