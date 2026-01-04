package com.example.teachingmanagement.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<TeamMembership> memberships;

    public Team() {}

    public Team(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<TeamMembership> getMemberships() {
        return memberships;
    }

    public void setMemberships(List<TeamMembership> memberships) {
        this.memberships = memberships;
    }
}