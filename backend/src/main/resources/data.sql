INSERT INTO users (username, password, role)
SELECT 'teacher1',
       '$2a$10$YOIHVxwifREwIgRNBmZZEenGb1L1OL/9sVJtiujAF1s0nwz2XUQym',
       'TEACHER'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE username = 'teacher1'
);

INSERT INTO course (id, name, code)
SELECT 1, 'IVS', 'IVS2025'
WHERE NOT EXISTS (
    SELECT 1 FROM course WHERE id = 1
);

INSERT INTO activity (id, name, type, course_id)
SELECT 1, 'Project 1', 'PROJECT', 1
WHERE NOT EXISTS (
    SELECT 1 FROM activity WHERE id = 1
);

INSERT INTO team (id, name)
SELECT 1, 'Team A'
WHERE NOT EXISTS (
    SELECT 1 FROM team WHERE id = 1
);

INSERT INTO student (id, first_name, last_name, email)
SELECT 1, 'Alice', 'Smith', 'alice@fit.cvut.cz'
WHERE NOT EXISTS (
    SELECT 1 FROM student WHERE email = 'alice@fit.cvut.cz'
);

INSERT INTO student (id, first_name, last_name, email)
SELECT 2, 'Bob', 'Jones', 'bob@fit.cvut.cz'
WHERE NOT EXISTS (
    SELECT 1 FROM student WHERE email = 'bob@fit.cvut.cz'
);

INSERT INTO team_membership (id, student_id, team_id, activity_id)
SELECT 1, 1, 1, 1
WHERE NOT EXISTS (
    SELECT 1 FROM team_membership
    WHERE student_id = 1 AND activity_id = 1
);

INSERT INTO team_membership (id, student_id, team_id, activity_id)
SELECT 2, 2, 1, 1
WHERE NOT EXISTS (
    SELECT 1 FROM team_membership
    WHERE student_id = 2 AND activity_id = 1
);

INSERT INTO criterion
(id, category, name, checking_procedure,
 evaluation_method, max_points, points_redistribution, default_feedback)
SELECT
1, 'Documentation', 'Structure', 'Check structure',
'PER_TEAM', 20, false, ''
WHERE NOT EXISTS (
    SELECT 1 FROM criterion WHERE id = 1
);

INSERT INTO criterion
(id, category, name, checking_procedure,
 evaluation_method, max_points, points_redistribution, default_feedback)
SELECT
2, 'Contribution', 'Activity', 'Check activity',
'PER_STUDENT', 10, false, ''
WHERE NOT EXISTS (
    SELECT 1 FROM criterion WHERE id = 2
);

INSERT INTO assessment (id, criterion_id, membership_id, points, feedback)
SELECT 1, 1, 1, 18, 'Well organized'
WHERE NOT EXISTS (
    SELECT 1 FROM assessment WHERE id = 1
);

INSERT INTO assessment (id, criterion_id, membership_id, points, feedback)
SELECT 2, 2, 1, 7, 'Good effort'
WHERE NOT EXISTS (
    SELECT 1 FROM assessment WHERE id = 2
);

INSERT INTO assessment (id, criterion_id, membership_id, points, feedback)
SELECT 3, 2, 2, 9, 'Excellent'
WHERE NOT EXISTS (
    SELECT 1 FROM assessment WHERE id = 3
);