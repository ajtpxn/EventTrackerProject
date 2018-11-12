package com.skilldistillery.studies.data;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.studies.entities.StudySession;

@RunWith(SpringRunner.class)
@SpringBootTest
class StudySessionRepositoryTests {
	
	@Autowired
	StudySessionRepository sessRepo;

	@Test
	@DisplayName("Test StudySessionRepository")
	void test01() {
		Optional<StudySession> opt = sessRepo.findById(1);
		System.out.println(opt);
		StudySession studySession = null;
		if ( opt.isPresent() ) {
			studySession = opt.get();
		}
		int returnName = studySession.getLength();
		assertEquals(20, returnName);
	}

}
