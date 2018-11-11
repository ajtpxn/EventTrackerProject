package com.skilldistillery.studies.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.studies.entities.StudySession;
import com.skilldistillery.studies.entities.Topic;
import com.skilldistillery.studies.services.TopicService;

@RestController
@RequestMapping("api")
public class TopicController {
	
	@Autowired
	TopicService topSer;
	
	@GetMapping("topics")
	public List<Topic> index() {
		return topSer.index();
	}
	
	@GetMapping("topics/{topicTitle}")
	public List<StudySession> showStudySessionsByTopic(@PathVariable("topicTitle") String topicTitle) {
		return topSer.showStudySessionsByTopic(topicTitle);
	}
	
	@GetMapping("topics/{topicTitle}/minutes")
	public int showMinutesByTopic(@PathVariable("topicTitle") String topicTitle) {
		return topSer.showMinutesByTopic(topicTitle);
	}
	
	@PostMapping("topics")
	public Topic addTopic(@RequestBody Topic topic) {
		return topSer.addTopic(topic);
	}
	
	@PutMapping("topics/{id}")
	public Topic updateTopic(@RequestBody Topic topic, @PathVariable("id") int id) {
		return topSer.updateTopic(topic, id);
	}
	
	@DeleteMapping("topics/{id}")
	public boolean deleteTopic(@PathVariable("id") int id) {
		topSer.deleteTopic(id);
		return true;
	}

}
