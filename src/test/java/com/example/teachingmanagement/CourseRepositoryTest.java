package com.example.teachingmanagement;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.teachingmanagement.model.Course;
import com.example.teachingmanagement.repository.CourseRepository;

@DataJpaTest
class CourseRepositoryTest {

    @Autowired
    private CourseRepository courseRepo;

    @Test
    void createAndFindCourse() {
        Course course = new Course("GJAE", "GJAE2025");
        Course saved = courseRepo.save(course);

        Optional<Course> foundCourse = courseRepo.findById(saved.getId());
        assertThat(foundCourse).isPresent();
        assertThat(foundCourse.get().getName()).isEqualTo("GJAE");
    }

    @Test
    void findAllCourses() {
        courseRepo.save(new Course("GJAE", "GJAE2025"));
        courseRepo.save(new Course("SIW", "SIW2025"));

        List<Course> courses = courseRepo.findAll();
        assertThat(courses).hasSize(2);
    }

    @Test
    void updateCourse() {
        Course course = new Course("GJAE", "GJAE2025");
        Course saved = courseRepo.save(course);

        saved.setName("GJAE Updated");
        Course updated = courseRepo.save(saved);

        assertThat(updated.getName()).isEqualTo("GJAE Updated");
    }

    @Test
    void deleteCourse() {
        Course course = new Course("GJAE", "GJAE2025");
        Course saved = courseRepo.save(course);

        courseRepo.deleteById(saved.getId());

        Optional<Course> found = courseRepo.findById(saved.getId());
        assertThat(found).isNotPresent();
    }
}