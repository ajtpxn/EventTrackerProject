package com.skilldistillery.studies.data;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.studies.entities.Topic;

@RunWith(SpringRunner.class)
@SpringBootTest
class TopicRepositoryTests {
	
	@Autowired
	TopicRepository topRepo;

	@Test
	@DisplayName("This is my Topic Repo Test")
	void test() {
		Topic topic = topRepo.findByTitle("Ham Radio");
		int returnName = topic.getId();
		assertEquals(1, returnName);
	}

}
