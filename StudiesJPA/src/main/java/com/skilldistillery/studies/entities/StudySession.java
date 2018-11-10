package com.skilldistillery.studies.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="study_sessions")
public class StudySession {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int length;
	
	@Column(name="study_date")
	private Date studyDate;
	
	@Column(name="study_topic_id")
	private int studyTopicId;

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

	public Date getStudyDate() {
		return studyDate;
	}

	public void setStudyDate(Date studyDate) {
		this.studyDate = studyDate;
	}

	public int getStudyTopicId() {
		return studyTopicId;
	}

	public void setStudyTopicId(int studyTopicId) {
		this.studyTopicId = studyTopicId;
	}
	
	


	




}
