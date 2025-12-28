package com.example.teachingmanagement;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.teachingmanagement.model.Activity;
import com.example.teachingmanagement.model.ActivityType;
import com.example.teachingmanagement.model.Course;
import com.example.teachingmanagement.model.Task;
import com.example.teachingmanagement.service.ActivityService;
import com.example.teachingmanagement.service.CourseService;
import com.example.teachingmanagement.service.TaskService;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class TaskServiceTest {

    @Autowired
    private TaskService taskService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private ActivityService activityService;

    @Test
    void saveTask() {
        Task task = new Task("Test task", new Activity("Test activity", ActivityType.LECTURE, new Course("Test", "T2025")));
        Task saved = taskService.save(task);
        assertThat(saved.getId()).isNotNull();
    }

     @Test
    void createForActivity() {
        Course course = courseService.save(new Course("GJAE", "GJAE2025"));
        Activity activity = activityService.createActivityForCourse(course.getId(), new Activity("Project", ActivityType.PROJECT, course));

        Task task = new Task("Implementation", activity);
        Task saved = taskService.createTaskForActivity(activity.getId(), task);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getActivity().getId()).isEqualTo(activity.getId());
    }

    @Test
    void findAll() {
        assertThat(taskService.findAll()).isNotNull();
    }

    @Test
    void findById() {
        Task task = new Task("Test task", new Activity("Test activity", ActivityType.LECTURE, new Course("Test", "T2025")));
        Task saved = taskService.save(task);
        Task found = taskService.findById(saved.getId());
        assertThat(found).isNotNull();
    }
}