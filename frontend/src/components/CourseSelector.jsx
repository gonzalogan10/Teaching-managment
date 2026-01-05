import { useEffect, useState } from "react";
//useEffect when using directly, useState for a value that changes over time

function CourseSelector(courseProps) {
  const [courses, setCourses] = useState([]);

  useEffect(() => { //lamda function
    fetch("http://localhost:8080/api/courses", {
      headers: {
        Authorization: "Basic " + btoa("teacher1:test")}})
    .then(response => response.json())
    .then(data => setCourses(data));}, 
    []);

  return (
    <select onChange={event => courseProps.onSelect(event.target.value)}>
      <option value="">Select a course</option>
      {courses.map(course => (
        <option key={course.id} value={course.id}>
          {course.name}
        </option>
      ))}
    </select>
  );
}

export default CourseSelector;
