package com.example.teachingmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.teachingmanagement.model.Task;
import com.example.teachingmanagement.repository.TaskRepository;


@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public Task save(Task task) {
        return repository.save(task);
    }

    public List<Task> findAll() {
        return repository.findAll();
    }
}
