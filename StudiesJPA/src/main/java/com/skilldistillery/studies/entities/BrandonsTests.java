package com.skilldistillery.studies.entities;

import java.time.LocalDate;

public class BrandonsTests {

	public static void main(String[] args) {
		
		StudySession mySess = new StudySession();
		
		System.out.println(mySess);
		
		mySess.setId(1);
		mySess.setLength(30);
		LocalDate thisDate = LocalDate.parse("2018-10-23");
		mySess.setStudyDate(thisDate);
		
		
		
		System.out.println(mySess.getId());
		System.out.println(mySess.getLength());
		System.out.println(mySess.getStudyDate());

	}

}
