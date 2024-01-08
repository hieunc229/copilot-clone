import java.util.Scanner;
/*
 * Write a program which takes the coordinates of the three vertices of a triangle
 * and computes the area of the triangle according to the following formula:
 *   Area = | (Ax.(By-Cy) + Bx.(Cy-Ay) + Cx.(Ay-By)) / 2 |
 */
public class TriangleArea {

	public static void main(String[] args) {

		System.out.print("Enter the coordinates of the triangle separated\nby spaces (x1 y1 x2 y2 x3 y3):");
		Scanner inputScanner = new Scanner( System.in );
		double x1 = inputScanner.nextDouble();
		double y1 = inputScanner.nextDouble();
		double x2 = inputScanner.nextDouble();
		double y2 = inputScanner.nextDouble();
		double x3 = inputScanner.nextDouble();
		double y3 = inputScanner.nextDouble();
		inputScanner.close();
		
		double area = Math.abs( (x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) / 2.0 );
		
		System.out.printf( "The area of triangle ((%.1f, %.1f), (%.1f, %.1f), (%.1f, %.1f)) is %.2f", x1, y1, x2, y2, x3, y3, area);

	}

}
 