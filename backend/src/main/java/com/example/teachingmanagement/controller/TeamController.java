package com.example.teachingmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.teachingmanagement.model.Team;
import com.example.teachingmanagement.service.TeamService;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService service;

    public TeamController(TeamService service) {
        this.service = service;
    }

    @PostMapping
    public Team create(@RequestBody Team team) {
        return service.save(team);
    }

    @GetMapping
    public List<Team> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Team getById(@PathVariable Long id) {
        return service.findById(id);
    }

    /**
     * Create a team for a specific course
     * @param courseId
     * @param team
     * @return
     */
    @PostMapping("/course/{courseId}")
    public Team createTeamForCourse(@PathVariable Long courseId, @RequestBody Team team) {
        return service.createTeamForCourse(courseId, team);
    }

    /**
     * Get all teams for a specific course
     * @param courseId
     * @return
     */
    @GetMapping("/course/{courseId}")
    public List<Team> getTeamsByCourse(@PathVariable Long courseId) {
        return service.findByCourseId(courseId);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Long id) {
        service.deleteTeam(id);
    }
}
