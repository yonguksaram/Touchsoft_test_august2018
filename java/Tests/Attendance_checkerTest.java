import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class Attendance_checkerTest {
	
	@Test
	public void test1() throws Exception {
		Attendance_checker tester = new Attendance_checker();
		int n = tester.typeResult("08:00 09:07 09:20 10:35 11:00 16:00 10:00 10:30 10:20 11:30 10:30 17:15");
		assertEquals(4, n);
	}

	
	@Test
	public void test2() throws Exception {
		Attendance_checker tester = new Attendance_checker();
		int n = tester.typeResult("08:00 19:07 09:20 10:35 11:00 16:00 10:00 10:30 10:20 11:30 10:30 17:15");
		assertEquals(5, n);
  }
  
  @Test
	public void test3() throws Exception {
		Attendance_checker tester = new Attendance_checker();
		int n = tester.typeResult("11:00 12:04 09:50 11:35 12:00 13:04 16:00 18:30 14:10 15:30 08:30 10:15");
		assertEquals(2, n);
  }
  
  @Test
	public void test4() throws Exception {
		Attendance_checker tester = new Attendance_checker();
		int n = tester.typeResult("14:30 16:11 10:40 18:05 10:20 15:00 11:20 16:30 11:00 19:30 08:40 10:11");
		assertEquals(5, n);
  }
  
  @Test
	public void test5() throws Exception {
		Attendance_checker tester = new Attendance_checker();
		int n = tester.typeResult("08:00 09:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00 17:00 18:00 19:00");
		assertEquals(1, n);
	}
}
