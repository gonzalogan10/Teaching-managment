import { useState, useEffect } from "react";
import CourseSelector from  "../components/CourseSelector.jsx";
import ActivityList from "../components/ActivityList.jsx";
import TaskCreator from "../components/TaskCreator.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskReport from "../components/TaskReport.jsx";
import './Screen.css';

function ActivityScreen() {
  const [courseId, setCourseId] = useState(null);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Reset activity and task when course changes
  useEffect(() => {
    setSelectedActivityId(null);
    setSelectedTaskId(null);
  }, [courseId]);

  return (
    <div>
      <h1>Teaching Management</h1>
      
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h2>Select a Course</h2>
        <CourseSelector onSelect={setCourseId} />
      </div>

      {courseId && (
        <div style={{ 
          marginTop: "30px", 
          padding: "25px", 
          backgroundColor: "#e8e8e8", 
          borderRadius: "8px",
          border: "2px solid #999",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ color: "#666", margin: "0 0 15px 0" }}>Selected Course</h3>
          <p style={{ color: "#777", fontSize: "1.1em", margin: "10px 0" }}><strong>ID:</strong> {courseId}</p>
        </div>
      )}

      {courseId && <ActivityList courseId={courseId} onActivitySelect={setSelectedActivityId} selectedActivityId={selectedActivityId} />}

      {selectedActivityId && (
        <div style={{ marginTop: "30px" }}>
          <TaskCreator activityId={selectedActivityId} />
          <TaskList activityId={selectedActivityId} onTaskSelect={setSelectedTaskId} selectedTaskId={selectedTaskId} />
          {selectedTaskId && <TaskReport courseId={courseId} taskId={selectedTaskId} />}
        </div>
      )}
    </div>
  );
}

export default ActivityScreen;
