package com.skilldistillery.studies.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.studies.data.StudySessionRepository;
import com.skilldistillery.studies.data.TopicRepository;
import com.skilldistillery.studies.entities.StudySession;
import com.skilldistillery.studies.entities.Topic;

@Transactional
@Service
public class TopicServiceImpl implements TopicService {
	
	@Autowired
	TopicRepository topRepo;
	
	
	@Autowired
	StudySessionRepository sessRepo;
	
	@Override
	public List<Topic> index() {
		return topRepo.findAll();
	}
	
	@Override
	public List<StudySession> showStudySessionsByTopic(String topicTitle) {
		Topic topic = topRepo.findByTitle(topicTitle);
		return sessRepo.findByTopic(topic);
	}
	
	@Override
	public int showMinutesByTopic(String topicTitle) {
		Topic topic = topRepo.findByTitle(topicTitle);
		List<StudySession> studySessions = sessRepo.findByTopic(topic);
		int total = 0;
		for (StudySession studySession : studySessions) {
			int min = studySession.getLength();
			total = total + min;
		}
		return total;
	}
	
	@Override
	public Topic addTopic(Topic topic) {
		return topRepo.saveAndFlush(topic);
	}
	
	@Override
	public Topic updateTopic(Topic topic, int id) {
		Optional<Topic> opt = topRepo.findById(id);
		Topic newTopic = null;
		if (opt.isPresent()) {
			newTopic = opt.get();
		}
		newTopic.setTitle(topic.getTitle());
		topRepo.saveAndFlush(newTopic);
		return newTopic;
	}
	
	
	
	@Override
	public void deleteTopic(int id) {
		topRepo.deleteById(id);
	}
	

}
