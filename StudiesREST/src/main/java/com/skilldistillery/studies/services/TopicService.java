package com.skilldistillery.studies.services;

import java.util.List;

import com.skilldistillery.studies.entities.StudySession;
import com.skilldistillery.studies.entities.Topic;

public interface TopicService {

	List<Topic> index();
	
	List<StudySession> showStudySessionsByTopic(String topicTitle);

	int showMinutesByTopic(String topicTitle);
	
	Topic addTopic(Topic topic);

	Topic updateTopic(Topic topic, int id);

	void deleteTopic(int id);

}
