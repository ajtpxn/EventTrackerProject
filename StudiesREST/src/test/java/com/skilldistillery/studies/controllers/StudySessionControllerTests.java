package com.skilldistillery.studies.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.studies.entities.StudySession;

@RunWith(SpringRunner.class)
@SpringBootTest
class StudySessionControllerTests {
	
	@Autowired
	StudySessionController sessCont;

	@Test
	@DisplayName("Test StudySessionService")
	void test01() {
		StudySession studySession = sessCont.show(1);
		int returnName = studySession.getLength();
		assertEquals(20, returnName);
	}

}
