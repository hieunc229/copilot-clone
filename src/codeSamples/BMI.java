import java.util.Scanner;

/*
 * Write a program which computes the Body Mass Index (BMI) of a person.  The BMI is
 * computed by dividing the weight of a person (in kgs) by the square of the height of
 * the person in metres.
 * 
 * Notes:
 *  - Your program will have input, computation and output.
 *  - You can use either the command line or dialog boxes for input and output.

 */
public class BMI {

	public static void main(String[] args) {
		Scanner input = new Scanner( System.in );
		System.out.print("What is your weight in kg? ");
		double weight = input.nextDouble();
		System.out.print("What is your height in metres? ");
		double height = input.nextDouble();
		
		double bmi = weight / (height*height);
		
		System.out.println("Your BMI is " + bmi );
	}

}
