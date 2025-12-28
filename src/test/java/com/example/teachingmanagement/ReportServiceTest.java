package com.example.teachingmanagement;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.teachingmanagement.model.Activity;
import com.example.teachingmanagement.model.ActivityType;
import com.example.teachingmanagement.model.Course;
import com.example.teachingmanagement.model.Report;
import com.example.teachingmanagement.model.Solver;
import com.example.teachingmanagement.model.Task;
import com.example.teachingmanagement.service.ActivityService;
import com.example.teachingmanagement.service.CourseService;
import com.example.teachingmanagement.service.ReportService;
import com.example.teachingmanagement.service.TaskService;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class ReportServiceTest {

    @Autowired
    private ReportService reportService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private TaskService taskService;

    @Test
    void saveReport() {
        Report report = new Report("Test report", "1 hour", 0.1, 10, null, null);
        Report saved = reportService.save(report);
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
        assertThat(reportService.findAll()).isNotNull();
    }

    @Test
    void findBySolver() {
        Solver solver = new Solver("Test solver");
        Report report = new Report("Solver report", "2 hours", 0.2, 20, solver, null);
        reportService.save(report);

        assertThat(reportService.findBySolver(solver.getId())).isNotEmpty();
    }

    @Test
    void findByTask() {
        Task task = new Task("Test task", null);
        Report report = new Report("Task report", "3 hours", 0.3, 30, null, task);
        reportService.save(report);

        assertThat(reportService.findByTask(task.getId())).isNotEmpty();
    }   
}