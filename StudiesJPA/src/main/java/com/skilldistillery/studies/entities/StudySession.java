package com.skilldistillery.studies.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="study_sessions")
public class StudySession {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int length;
	
	@Column(name="study_date")
	private LocalDate studyDate;
	
	@ManyToOne
	@JoinColumn(name="study_topic_id")
	private Topic topic;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public LocalDate getStudyDate() {
		return studyDate;
	}

	public void setStudyDate(LocalDate studyDate) {
		this.studyDate = studyDate;
	}

	public Topic getTopic() {
		return topic;
	}

	public void setTopic(Topic topic) {
		this.topic = topic;
	}


	
	


	




}
