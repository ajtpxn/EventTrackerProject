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
import com.skilldistillery.studies.services.StudySessionService;

@RestController
@RequestMapping("api")
public class StudySessionController {
	
	@Autowired
	StudySessionService sessSer;
	
	@GetMapping("ping")
	public String ping() {
		return "pong";
	}
	
	@GetMapping("studySessions")
	public List<StudySession> index() {
		return sessSer.index();
	}
	
	@GetMapping("studySessions/{id}")
	public StudySession show(@PathVariable("id") int id) {
		return sessSer.show(id);
	}
	
	@PostMapping("studySessions")
	public StudySession addStudySession(@RequestBody StudySession studySession) {
		return sessSer.addStudySession(studySession);
	}
	
	@PutMapping("studySessions/{id}")
	public StudySession updateStudySession(@RequestBody StudySession studySession, @PathVariable("id") int id) {
		return sessSer.updateStudySession(studySession, id);
	}
	
	@DeleteMapping("studySessions/{id}")
	public boolean deleteStudySession(@PathVariable("id") int id) {
		sessSer.deleteStudySession(id);
		return true;
	}
	
	
}
