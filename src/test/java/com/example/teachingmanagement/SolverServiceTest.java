package com.example.teachingmanagement;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.teachingmanagement.model.Activity;
import com.example.teachingmanagement.model.ActivityType;
import com.example.teachingmanagement.model.Course;
import com.example.teachingmanagement.model.Solver;
import com.example.teachingmanagement.model.Task;
import com.example.teachingmanagement.repository.TaskRepository;
import com.example.teachingmanagement.service.SolverService;

@SpringBootTest
class SolverServiceTest {

    @Autowired
    private SolverService solverService;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void saveSolver() {
        Solver solver = new Solver("Test solver");
        Solver saved = solverService.saveSolver(solver);
        assertThat(saved.getId()).isNotNull();
    }

    @Test
    void findAll() {
        assertThat(solverService.findAllSolvers()).isNotNull();
    }

    @Test
    void findById() {
        Solver solver = new Solver("Test solver");
        Solver saved = solverService.saveSolver(solver);
        Solver found = solverService.findById(saved.getId());
        assertThat(found).isNotNull();
    }

    @Test
    void addSolverToTask() {
        Solver solver = solverService.saveSolver(new Solver("Test solver"));
        Task task = taskRepository.save(new Task("Test task", new Activity("Test activity", ActivityType.LECTURE, new Course("Test", "T2025"))));
        solverService.addSolverToTask(task.getId(), solver.getId());

        // Verifies that the solver is added to the task
        Task updatedTask = taskRepository.findById(task.getId()).orElse(null);
        assertThat(updatedTask).isNotNull();
        assertThat(updatedTask.getSolvers()).contains(solver);
        assertThat(updatedTask.getSolvers()).hasSize(1);

        // Cannot add the same solver twice
        solverService.addSolverToTask(task.getId(), solver.getId());
        Task updatedTask2 = taskRepository.findById(task.getId()).orElse(null);
        assertThat(updatedTask2.getSolvers()).hasSize(1);
    }

    @Test
    void setMainSolver() {
        Solver solver = solverService.saveSolver(new Solver("Test solver"));
        Task task = taskRepository.save(new Task("Test task", new Activity("Test activity", ActivityType.LECTURE, new Course("Test", "T2025"))));
        solverService.setMainSolver(solver.getId(), task.getId());
        // Verifies that the main solver is set in the task
        Task updatedTask = taskRepository.findById(task.getId()).orElse(null);
        assertThat(updatedTask).isNotNull();
        assertThat(updatedTask.getMainSolver()).isEqualTo(solver);
    }
}