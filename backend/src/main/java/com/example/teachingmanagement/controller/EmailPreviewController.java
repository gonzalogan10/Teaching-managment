package com.example.teachingmanagement.controller;

import com.example.teachingmanagement.dto.email.TeamEmailPreviewDto;
import com.example.teachingmanagement.service.email.EmailPreviewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email-previews")
public class EmailPreviewController {

    private final EmailPreviewService emailPreviewService;

    public EmailPreviewController(EmailPreviewService emailPreviewService) {
        this.emailPreviewService = emailPreviewService;
    }

    @GetMapping("/team/{teamId}")
    public TeamEmailPreviewDto previewTeam(@PathVariable Long teamId) {
        return emailPreviewService.buildTeamPreview(teamId);
    }
}