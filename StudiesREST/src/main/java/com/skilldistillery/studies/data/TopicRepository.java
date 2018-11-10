package com.skilldistillery.studies.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.studies.entities.Topic;

public interface TopicRepository extends JpaRepository<Topic, Integer> {

}
