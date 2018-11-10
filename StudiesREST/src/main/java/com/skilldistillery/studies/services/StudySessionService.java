package com.skilldistillery.studies.services;

import java.util.List;

import com.skilldistillery.studies.entities.StudySession;

public interface StudySessionService {

	List<StudySession> index();

	StudySession show(int id);

	StudySession addStudySession(StudySession studySession);

	void deleteStudySession(int id);

}
