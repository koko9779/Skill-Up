package Etc;

import java.util.Scanner;

public class CountingSort {
	/*
	 * 계수 정렬(CountingSort)
	 * -> 범위 조건이 있는 경우에 한해서 굉장히 빠른 알고리즘
	 * 
	 * 단점: 시간은 빠르지만 공간효율성이 떨어짐
	 */
	
	int[] numbers;	//입력된 숫자
	int[] countArr;	//숫자 count
	int[] result;	//정렬된 후 숫자 저장
	int max = 0;
	
	//숫자 입력하기
	void inputNumbers() {
		Scanner sc = new Scanner(System.in);
		int size = sc.nextInt();
		numbers = new int[size];
        for (int i = 0; i < numbers.length; i++) {
            int num = sc.nextInt();
            numbers[i] = num;
            if (max < num) {
                max = num;
            }
        }
	}
	
	//최대값 찾기
	int findMaxNumber() {
		int max = 0;
		for (int i = 0; i < numbers.length; i++) {
			if(max < numbers[i]) {
				max = numbers[i];
			}
		}
		return max;
	}
	
	void display() {
		for (int i = 0; i < countArr.length; i++) {
			System.out.print(countArr[i]+" ");
		}
		System.out.println();
	}
	
	void display(int[] arr) {
		for (int i = 0; i < arr.length; i++) {
			System.out.print(arr[i]+" ");
		}
		System.out.println();
	}
	
	void sort() {
		inputNumbers();
		int maxNumber = findMaxNumber();
		countArr = new int[maxNumber+1];	//최대값+1길이의 count배열생성
		result = new int[numbers.length];	//정렬된 결과값 길이는 처음과 동일하게
		
		for (int i = 0; i < numbers.length; i++) {
			//해당하는 숫자 count
			countArr[numbers[i]]++;
		}
		
		System.out.println("CountArr[]=");
		display();
		
		for (int i = 0; i < countArr.length; i++) {
			//누적 숫자 더하기 : 정렬된 배열에 각 값이 들어갈 위치를 확보하기 위해서
			
			//ex. {1,4,4,6} 
			//: 0은 0~1인덱스 사이에 (0), 1은 1~4사이에 (1,2,3), 2는 4~4 사이에 (x), 3은 4~6 사이에 (4,5)
			countArr[i] += countArr[i-1];
		}
		
		System.out.println("누적 배열");
		display();
		
		for (int i = 0; i < numbers.length; i++) {
			//정렬하기
			
			//number의 값에 해당하는 count값-1을한 result인덱스 위치에 numbers값을 넣어준다.
			//(범위의 마지막값은 인덱스값보다 1작기 때문에)
			//그리고 countArr의 값을 줄여주며 다음 값의 위치를 찾아야하기 때문에 
			//--countArr를 사용한다
			
			result[--countArr[numbers[i]]] = numbers[i];
		}
		
		display();
		
	}
	
	public static void main(String[] args) {
		new CountingSort().sort();
		
	}
	
}
