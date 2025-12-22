package com.example.teachingmanagement.repository;

import com.example.teachingmanagement.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
