import java.io.*;
import java.util.Arrays;



public class Attendance_checker {

        public String getTime() {
        	String fileInString = "";
        	try{
			    FileInputStream fstream = new FileInputStream("C:/time.txt");
			    BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
			    String strLine;
			    while ((strLine = br.readLine()) != null){
			      fileInString = fileInString.concat(strLine+" ");
			    }
  			}catch (IOException e){
			    System.out.println("Error");
		    } 
        	return fileInString;
        }

        public int typeResult(String text) {
	        String[] ary = text.split(" ");
		      String[] newArray = new String[ary.length];
		      for (int i = 0; i < ary.length; i++) {
		        newArray[i]  = ary[i];
		        if((i+1)%2 == 1){
		          newArray[i] = newArray[i]+"0";
		        } else {
		         newArray[i] = newArray[i]+"1";
		        }
		      }
		      int count = 0;
		      int currentCount = 0;
		      Arrays.sort(newArray);

		      for (int j = 0; j < ary.length; j++) {
		        char ch = newArray[j].charAt(newArray[j].length() - 1);
		        if( ch == '0'){
		          currentCount++;
		          if( currentCount>count){
		            count++;
		          }
		        } else if(ch == '1'){
		          currentCount--;
		        }
		      }
		      return count;
		   	}
			
       	public static void main(String[] args) {
          Attendance_checker timeChecker = new Attendance_checker();
	        String result = timeChecker.getTime();
          System.out.println timeChecker.typeResult(result));
        
      	}
}