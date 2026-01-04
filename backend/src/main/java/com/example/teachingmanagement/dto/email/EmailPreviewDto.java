package com.example.teachingmanagement.dto.email;

import java.util.List;

public class EmailPreviewDto {

    private final String subject;
    private final String body;
    private final List<CriterionResultDto> criteria;

    private final double teamTotal;
    private final double studentTotal;

    public EmailPreviewDto(String subject, String body, List<CriterionResultDto> criteria, double teamTotal, double studentTotal) {
        this.subject = subject;
        this.body = body;
        this.criteria = criteria;
        this.teamTotal = teamTotal;
        this.studentTotal = studentTotal;
    }

    public String getSubject() {
        return subject;
    }

    public String getBody() {
        return body;
    }

    public List<CriterionResultDto> getCriteria() {
        return criteria;
    }

    public double getTeamTotal() {
        return teamTotal;
    }

    public double getStudentTotal() {
        return studentTotal;
    }
}