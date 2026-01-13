package com.example.teachingmanagement.controller;

import com.example.teachingmanagement.dto.AssessmentDetailDto;
import com.example.teachingmanagement.dto.EvaluationDto;
import com.example.teachingmanagement.model.Assessment;
import com.example.teachingmanagement.service.EvaluationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController {

    private final EvaluationService evaluationService;

    public EvaluationController(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    @PostMapping
    public Assessment createEvaluation(@RequestBody EvaluationDto dto) {
        return evaluationService.createEvaluation(
            dto.getTeamId(), 
            dto.getCriterionId(), 
            dto.getPoints(), 
            dto.getFeedback() != null ? dto.getFeedback() : ""
        );
    }

    @GetMapping("/team/{teamId}")
    public List<AssessmentDetailDto> getTeamAssessments(@PathVariable Long teamId) {
        return evaluationService.getAssessmentsByTeamAsDto(teamId);
    }

    @PutMapping("/{assessmentId}")
    public Assessment updateEvaluation(@PathVariable Long assessmentId,
                                      @RequestBody EvaluationDto dto) {
        return evaluationService.updateEvaluation(
            assessmentId, 
            dto.getPoints(), 
            dto.getFeedback() != null ? dto.getFeedback() : ""
        );
    }

    @DeleteMapping("/{assessmentId}")
    public void deleteEvaluation(@PathVariable Long assessmentId) {
        evaluationService.deleteEvaluation(assessmentId);
    }

    @GetMapping("/criterion/{criterionId}/team/{teamId}")
    public boolean existsEvaluation(@PathVariable Long criterionId, @PathVariable Long teamId) {
        return evaluationService.existsEvaluation(criterionId, teamId);
    }
}
