import java.util.Scanner;

// Write a program which displays all multiples of a user supplied positive integer
// up to a user supplied limit.  The output from the program should be in the
// form, "The multiples of 5 (up to 32) are 0, 5, 10, 15, 20, 25, 30", if the user
// had entered 5 as the number and 32 as the limit for example.  Make sure your
// program does something reasonable if the number entered is less than 1
// (i.e. 0 or negative).
public class Multiples {

	public static void main(String[] args) {

		System.out.print("Enter your number: ");
		Scanner input = new Scanner( System.in );
		int number = input.nextInt();
		System.out.print("Enter the limit: ");
		int limit = input.nextInt();
		input.close();

		if ((number > 0) && (limit > 0))
		{
			System.out.print("The multiples of " + number + " (up to " + limit + ") are ");
			for (int total = 0; (total < limit); total+=number)
				System.out.print(((total>0)?", ":"") + total);
			System.out.println("");
		}
	}

}
