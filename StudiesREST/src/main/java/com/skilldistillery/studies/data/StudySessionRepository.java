package com.skilldistillery.studies.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.studies.entities.StudySession;
import com.skilldistillery.studies.entities.Topic;

public interface StudySessionRepository extends JpaRepository<StudySession, Integer> {

	List<StudySession> findByTopic(Topic topic);
	
}
