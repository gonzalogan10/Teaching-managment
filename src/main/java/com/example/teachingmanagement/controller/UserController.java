package com.example.teachingmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.teachingmanagement.model.User;
import com.example.teachingmanagement.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    // ✅ Create user
    @PostMapping
    public User create(@RequestBody User user) {
        return repository.save(user);
    }

    // ✅ Get all users
    @GetMapping
    public List<User> getAll() {
        return repository.findAll();
    }
}
