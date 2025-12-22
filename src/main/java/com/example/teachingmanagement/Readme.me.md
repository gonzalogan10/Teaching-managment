# Teaching Management – Backend

## Project overview
This repository contains the **backend part** of the Teaching Management application.
The backend provides a **REST API** and a **data model** to support the management of courses, activities and tasks.

The current state of the project corresponds to a **backend MVP (Minimum Viable Product)**:
a minimal but fully functional backend that demonstrates the core idea of the project
and can be extended later.

---

## What is implemented

### Backend features
- Spring Boot backend application
- REST API exchanging data in JSON format
- Data persistence using Spring Data JPA
- In-memory database (H2)
- Entity model:
  - Course
  - Activity
  - Task
- Basic user management:
  - User entity
  - Roles: TEACHER and STUDENT
- Application security using Spring Security (HTTP Basic authentication)

---

## Technologies
- Java 21
- Spring Boot
- Spring Data JPA (Hibernate)
- Spring Security
- H2 Database (in-memory)
- Maven

---

## Project structure

src/main/java/com/example/teachingmanagement
│
├── controller // REST API endpoints
├── service // Business logic and security services
├── repository // Database access (JPA)
├── model // JPA entities and enums
├── security // Spring Security configuration
└── TeachingManagementApplication.java


---

## How to run the application

### Requirements
- Java 21
- Maven or Maven Wrapper

### Start the application
From the project root directory:

mvnw.cmd spring-boot:run

### TEST

API usage
Create a course :

POST /api/courses

Request body:

{
  "name": "IVS",
  "code": "IVS2025"
}


PowerShell example:

Invoke-RestMethod -Method POST `
  -Uri http://localhost:8080/api/courses `
  -ContentType "application/json" `
  -Body '{"name":"IVS","code":"IVS2025"}'

Get all courses

GET /api/courses

Invoke-RestMethod -Uri http://localhost:8080/api/courses

User management & authentication

The backend includes basic authentication using Spring Security.

Create a user

POST /api/users

Request body:

{
  "username": "teacher1",
  "password": "test",
  "role": "TEACHER"
}


Example:

Invoke-RestMethod -Method POST `
  -Uri http://localhost:8080/api/users `
  -ContentType "application/json" `
  -Body '{"username":"teacher1","password":"test","role":"TEACHER"}'

Access secured endpoints

When accessing protected endpoints, authentication is required.

Example:

Invoke-RestMethod `
  -Uri http://localhost:8080/api/courses `
  -Authentication Basic `
  -Credential (Get-Credential)

Database access (H2 console)

The application uses an in-memory H2 database.

Access URL
http://localhost:8080/h2

Connection parameters

JDBC URL: jdbc:h2:mem:teachingdb

User: sa

Password: (empty)

Example SQL query:

SELECT * FROM COURSE;