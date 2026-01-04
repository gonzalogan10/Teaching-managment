package com.example.teachingmanagement.service;

import com.example.teachingmanagement.model.Activity;
import com.example.teachingmanagement.model.Student;
import com.example.teachingmanagement.model.Team;
import com.example.teachingmanagement.model.TeamMembership;
import com.example.teachingmanagement.repository.TeamMembershipRepository;
import org.springframework.stereotype.Service;

@Service
public class TeamMembershipService {

    private final TeamMembershipRepository repository;

    public TeamMembershipService(TeamMembershipRepository repository) {
        this.repository = repository;
    }

    public TeamMembership addStudentToTeam(Student student, Team team, Activity activity) {
        boolean alreadyExists = repository.existsByStudentAndActivity(student, activity);
        if (alreadyExists) {
            throw new IllegalStateException("Student is already in a team for this activity");
        }
        TeamMembership membership = new TeamMembership(student, team, activity);
        return repository.save(membership);
    }
}