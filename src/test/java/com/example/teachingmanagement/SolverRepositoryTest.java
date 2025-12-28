package com.example.teachingmanagement;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.teachingmanagement.model.Solver;
import com.example.teachingmanagement.repository.SolverRepository;

import java.util.List;
import java.util.Optional;

@DataJpaTest
class SolverRepositoryTest {

    @Autowired
    private SolverRepository solverRepository;

    @Test
    void createSolver() {
        Solver solver = new Solver("Sara");
        Solver saved = solverRepository.save(solver);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Sara");
    }

    @Test
    void findSolverById() {
        Solver solver = new Solver("Sara");
        Solver saved = solverRepository.save(solver);

        Optional<Solver> found = solverRepository.findById(saved.getId());
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Sara");
    }

    @Test
    void findAllSolvers() {
        solverRepository.save(new Solver("Sara"));
        solverRepository.save(new Solver("John"));

        List<Solver> solvers = solverRepository.findAll();
        assertThat(solvers).hasSize(2);
    }

    @Test
    void updateSolver() {
        Solver solver = new Solver("Sara");
        Solver saved = solverRepository.save(solver);

        saved.setName("Sara Updated");
        Solver updated = solverRepository.save(saved);

        assertThat(updated.getName()).isEqualTo("Sara Updated");
    }

    @Test
    void deleteSolver() {
        Solver solver = new Solver("Sara");
        Solver saved = solverRepository.save(solver);

        solverRepository.deleteById(saved.getId());

        Optional<Solver> found = solverRepository.findById(saved.getId());
        assertThat(found).isNotPresent();
    }
}
