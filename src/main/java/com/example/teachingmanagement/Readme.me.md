# Teaching Management – Backend

## Project Overview

This repository contains the **backend part** of the *Teaching Management* application.

The backend provides a **RESTful API** and a **data model** to support the management of courses, activities, tasks, and users.
All data is exchanged in **JSON format**.

The current state of the project corresponds to a **Backend MVP (Minimum Viable Product)**:
a minimal but fully functional backend that demonstrates the core concept of the application and can be extended in future iterations.

---

## Implemented Features

### Backend Functionality
- Spring Boot backend application
- REST API (JSON-based)
- Data persistence using Spring Data JPA
- In-memory database (H2)
- Entity model:
  - `Course`
  - `Activity`
  - `Task`
- Basic user management:
  - `User` entity
  - Roles: `TEACHER`, `STUDENT`
- Application security:
  - Spring Security
  - HTTP Basic authentication
  - Password hashing using BCrypt

---

## Technologies Used

- Java 21
- Spring Boot
- Spring Data JPA (Hibernate)
- Spring Security
- H2 Database (in-memory)
- Maven

---

## Project Structure

src/main/java/com/example/teachingmanagement
│
├── controller // REST API endpoints
├── service // Business logic and security services
├── repository // Data access layer (JPA repositories)
├── model // JPA entities and enums
├── security // Spring Security configuration
└── TeachingManagementApplication.java
---

## How to Run the Application

### Requirements
- Java 21
- Maven or Maven Wrapper

### Start the Application

From the project root directory:

mvnw.cmd spring-boot:run


When the application is ready, the following message appears in the console:

Started TeachingManagementApplication

The backend is then available at:

http://localhost:8080

API Usage & Testing
User Management & Authentication
The backend uses HTTP Basic authentication.
Passwords are hashed using BCrypt before being stored in the database.

Create a User (public endpoint)
Endpoint

POST /api/users
Request body

{
  "username": "teacher1",
  "password": "test",
  "role": "TEACHER"
}
PowerShell example

Invoke-RestMethod -Method POST `
  -Uri http://localhost:8080/api/users `
  -ContentType "application/json" `
  -Body '{"username":"teacher1","password":"test","role":"TEACHER"}'


Course Management (secured endpoints)
All course-related endpoints require authentication.

Create a Course :

Endpoint

POST /api/courses
Request body

{
  "name": "IVS",
  "code": "IVS2025"
}
PowerShell example

Invoke-RestMethod -Method POST `
  -Uri http://localhost:8080/api/courses `
  -Credential (Get-Credential) `
  -ContentType "application/json" `
  -Body '{"name":"IVS","code":"IVS2025"}'


Get All Courses
Endpoint

GET /api/courses
PowerShell example

Invoke-RestMethod `
 -Uri http://localhost:8080/api/courses `
 -Credential (Get-Credential)
Database Access (H2 Console)
The application uses an in-memory H2 database for development and testing purposes.

Access URL :
http://localhost:8080/h2
Connection Parameters

JDBC URL : jdbc:h2:mem:teachingdb
User     : sa
Password : (empty)

Example SQL Queries :

SELECT * FROM USERS;
SELECT * FROM COURSE;
SELECT * FROM ACTIVITY;
SELECT * FROM TASK;

The H2 console is enabled for development only and explicitly allowed in the security configuration.