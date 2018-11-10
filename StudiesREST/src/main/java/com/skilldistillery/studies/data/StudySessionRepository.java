package com.skilldistillery.studies.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.studies.entities.StudySession;

public interface StudySessionRepository extends JpaRepository<StudySession, Integer> {

}
