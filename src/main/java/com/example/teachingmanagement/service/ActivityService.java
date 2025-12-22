package com.example.teachingmanagement.service;

import com.example.teachingmanagement.model.Activity;
import com.example.teachingmanagement.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository repository;

    public ActivityService(ActivityRepository repository) {
        this.repository = repository;
    }

    public Activity save(Activity activity) {
        return repository.save(activity);
    }

    public List<Activity> findAll() {
        return repository.findAll();
    }
}
