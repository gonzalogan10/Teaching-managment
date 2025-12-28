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

    /**
     * Create an activity for a specific course
     * PathVariable is used to extract values from the URL path and convert them into Long parameters.
     * @param courseId ID of the course for which the activity will be created
     * @param activity Activity to be created
     * @return
     */
    @PostMapping("/course/{courseId}")
    public Activity createActivityForCourse(@PathVariable Long courseId, @RequestBody Activity activity) {
        return service.createActivityForCourse(courseId, activity);
    }
}
