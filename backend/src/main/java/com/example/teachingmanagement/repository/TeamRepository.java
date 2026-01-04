package com.example.teachingmanagement.repository;

import com.example.teachingmanagement.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long>  {
}