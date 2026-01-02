package com.example.teachingmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.teachingmanagement.model.Report;
import com.example.teachingmanagement.model.Solver;
import com.example.teachingmanagement.model.Task;

public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findBySolver(Solver solver);

    List<Report> findByTask(Task task);
}