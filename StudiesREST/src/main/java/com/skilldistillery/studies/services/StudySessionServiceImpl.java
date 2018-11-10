package com.skilldistillery.studies.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.studies.data.StudySessionRepository;
import com.skilldistillery.studies.entities.StudySession;

@Transactional
@Service
public class StudySessionServiceImpl implements StudySessionService {
	
	@Autowired
	StudySessionRepository sessRepo;
	
	@Override
	public List<StudySession> index() {
		return sessRepo.findAll();
	}

	@Override
	public StudySession show(int id) {
		Optional<StudySession> opt = sessRepo.findById(id);
		StudySession studySession = null;
		if (opt.isPresent()) {
			studySession = opt.get();
		}
		return studySession;
	}
	
	@Override
	public StudySession addStudySession(StudySession studySession) {
		return sessRepo.saveAndFlush(studySession);
	}
	
	@Override
	public StudySession updateStudySession(StudySession studySession, int id) {
		System.out.println("Date: "+studySession.getStudyDate());
		Optional<StudySession> opt = sessRepo.findById(id);
		StudySession newStudySession = null;
		if (opt.isPresent()) {
			newStudySession = opt.get();
		}
		newStudySession.setLength(studySession.getLength());
		newStudySession.setStudyDate(studySession.getStudyDate());
		newStudySession.setTopic(studySession.getTopic());
		sessRepo.saveAndFlush(newStudySession);
		
		System.out.println("New Study Date: "+newStudySession.getStudyDate());
		
		return newStudySession;
	}
	
	@Override
	public void deleteStudySession(int id) {
		sessRepo.deleteById(id);
	}

}
