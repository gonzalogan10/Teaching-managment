package com.example.teachingmanagement.controller;

import com.example.teachingmanagement.model.Activity;
import com.example.teachingmanagement.service.ActivityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService service;

    public ActivityController(ActivityService service) {
        this.service = service;
    }

    @PostMapping
    public Activity create(@RequestBody Activity activity) {
        return service.save(activity);
    }

    @GetMapping
    public List<Activity> getAll() {
        return service.findAll();
    }
}
