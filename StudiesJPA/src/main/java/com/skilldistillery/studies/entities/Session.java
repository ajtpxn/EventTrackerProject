package com.skilldistillery.studies.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="study_session")
public class Session {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int length;
	
	@Column(name="study_date")
	private Date studyDate;
	
	@Column(name="study_topic_id")
	private String studyTopicId;

}
