package com.example.teachingmanagement.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.teachingmanagement.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByActivityId(Long activityId);
}
