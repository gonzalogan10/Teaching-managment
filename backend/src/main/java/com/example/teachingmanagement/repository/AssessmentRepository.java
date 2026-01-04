package com.example.teachingmanagement.repository;

import com.example.teachingmanagement.model.Assessment;
import com.example.teachingmanagement.model.TeamMembership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    List<Assessment> findByMembership(TeamMembership membership);

    List<Assessment> findByMembershipIn(List<TeamMembership> memberships);
}