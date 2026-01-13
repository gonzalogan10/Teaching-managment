package com.example.teachingmanagement.service;

import com.example.teachingmanagement.dto.AssessmentDetailDto;
import com.example.teachingmanagement.model.Assessment;
import com.example.teachingmanagement.model.Criterion;
import com.example.teachingmanagement.model.Team;
import com.example.teachingmanagement.model.TeamMembership;
import com.example.teachingmanagement.repository.AssessmentRepository;
import com.example.teachingmanagement.repository.CriterionRepository;
import com.example.teachingmanagement.repository.TeamMembershipRepository;
import com.example.teachingmanagement.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvaluationService {

    private final AssessmentRepository assessmentRepository;
    private final CriterionRepository criterionRepository;
    private final TeamRepository teamRepository;
    private final TeamMembershipRepository teamMembershipRepository;

    public EvaluationService(AssessmentRepository assessmentRepository, 
                             CriterionRepository criterionRepository,
                             TeamRepository teamRepository,
                             TeamMembershipRepository teamMembershipRepository) {
        this.assessmentRepository = assessmentRepository;
        this.criterionRepository = criterionRepository;
        this.teamRepository = teamRepository;
        this.teamMembershipRepository = teamMembershipRepository;
    }

    public Assessment createEvaluation(Long teamId, Long criterionId, Double points, String feedback) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        
        Criterion criterion = criterionRepository.findById(criterionId)
                .orElseThrow(() -> new RuntimeException("Criterion not found"));

        // Check if this criterion is already evaluated for this team
        if (assessmentRepository.existsByCriterionAndTeam(criterionId, teamId)) {
            throw new RuntimeException("This criterion has already been evaluated for this team");
        }

        // For team-based evaluation, we create assessments for each team member
        List<TeamMembership> memberships = teamMembershipRepository.findByTeam(team);
        
        if (memberships.isEmpty()) {
            throw new RuntimeException("Team has no members");
        }

        // Each team member gets the full points assigned to the team
        Assessment lastAssessment = null;
        for (TeamMembership membership : memberships) {
            Assessment assessment = new Assessment();
            assessment.setCriterion(criterion);
            assessment.setTeamMembership(membership);
            assessment.setPoints(points);
            assessment.setFeedback(feedback);
            lastAssessment = assessmentRepository.save(assessment);
        }

        // Return the last assessment that was saved
        return lastAssessment;
    }

    public List<Assessment> getAssessmentsByTeam(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        
        return assessmentRepository.findByTeamIdWithDetails(teamId);
    }

    public Assessment updateEvaluation(Long assessmentId, Double points, String feedback) {
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));
        
        assessment.setPoints(points);
        assessment.setFeedback(feedback);
        return assessmentRepository.save(assessment);
    }

    public void deleteEvaluation(Long assessmentId) {
        assessmentRepository.deleteById(assessmentId);
    }

    public boolean existsEvaluation(Long criterionId, Long teamId) {
        return assessmentRepository.existsByCriterionAndTeam(criterionId, teamId);
    }

    public List<AssessmentDetailDto> getAssessmentsByTeamAsDto(Long teamId) {
        List<Assessment> assessments = getAssessmentsByTeam(teamId);
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        List<TeamMembership> memberships = teamMembershipRepository.findByTeam(team);
        int teamSize = memberships.size();
        
        return assessments.stream()
                .map(a -> new AssessmentDetailDto(
                    a.getId(),
                    a.getCriterion().getId(),
                    a.getCriterion().getName(),
                    a.getTeamMembership().getStudent().getId(),
                    a.getTeamMembership().getStudent().getFirstName() + " " + a.getTeamMembership().getStudent().getLastName(),
                    a.getPoints(),
                    a.getFeedback(),
                    teamSize
                ))
                .collect(Collectors.toList());
    }
}
