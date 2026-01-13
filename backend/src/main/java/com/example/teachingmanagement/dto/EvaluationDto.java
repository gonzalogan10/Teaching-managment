package com.example.teachingmanagement.dto;

public class EvaluationDto {
    private Long teamId;
    private Long criterionId;
    private Double points;
    private String feedback;

    public EvaluationDto() {
    }

    public EvaluationDto(Long teamId, Long criterionId, Double points, String feedback) {
        this.teamId = teamId;
        this.criterionId = criterionId;
        this.points = points;
        this.feedback = feedback;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public Long getCriterionId() {
        return criterionId;
    }

    public void setCriterionId(Long criterionId) {
        this.criterionId = criterionId;
    }

    public Double getPoints() {
        return points;
    }

    public void setPoints(Double points) {
        this.points = points;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
