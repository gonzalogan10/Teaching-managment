package com.example.teachingmanagement;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.teachingmanagement.model.Activity;
import com.example.teachingmanagement.model.ActivityType;
import com.example.teachingmanagement.model.Course;
import com.example.teachingmanagement.model.Task;
import com.example.teachingmanagement.repository.ActivityRepository;
import com.example.teachingmanagement.repository.TaskRepository;

@DataJpaTest
class TaskRepositoryTest {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void createTaskForActivity() {
        Activity activity = activityRepository.save(new Activity("Project 1", ActivityType.PROJECT, new Course("GJAE", "GJAE2025")));
        Task task = new Task("Implementation", activity);

        Task saved = taskRepository.save(task);
        assertThat(saved.getActivity().getId()).isEqualTo(activity.getId());
    }

    @Test
    void findTaskById() {
        Activity activity = activityRepository.save(new Activity("Project 1", ActivityType.PROJECT, new Course("GJAE", "GJAE2025")));
        Task task = new Task("Implementation", activity);
        Task saved = taskRepository.save(task);

        Optional<Task> found = taskRepository.findById(saved.getId());
        assertThat(found).isPresent();
        assertThat(found).hasValueSatisfying(t -> assertThat(t.getTitle()).isEqualTo("Implementation"));
    }

    @Test
    void findAllTasks() {
        Activity activity = activityRepository.save(new Activity("Project 1", ActivityType.PROJECT, new Course("GJAE", "GJAE2025")));
        taskRepository.save(new Task("Implementation", activity));
        taskRepository.save(new Task("Testing", activity));

        List<Task> tasks = taskRepository.findAll();
        assertThat(tasks).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    void updateTask() {
        Activity activity = activityRepository.save(new Activity("Project 1", ActivityType.PROJECT, new Course("GJAE", "GJAE2025")));
        Task task = new Task("Implementation", activity);
        Task saved = taskRepository.save(task);

        saved.setTitle("Implementation Updated");
        Task updated = taskRepository.save(saved);

        assertThat(updated.getTitle()).isEqualTo("Implementation Updated");
    }

    @Test
    void deleteTask() {
        Activity activity = activityRepository.save(new Activity("Project 1", ActivityType.PROJECT, new Course("GJAE", "GJAE2025")));
        Task task = new Task("Implementation", activity);
        Task saved = taskRepository.save(task);

        taskRepository.deleteById(saved.getId());

        Optional<Task> found = taskRepository.findById(saved.getId());
        assertThat(found).isNotPresent();
    }
}