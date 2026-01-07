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
      
      <div className="activity-screen-course-section">
        <h2>Select a Course</h2>
        <CourseSelector onSelect={setCourseId} />
      </div>

      {courseId && (
        <div className="activity-screen-course-details">
          <h3>Selected Course</h3>
          <p><strong>ID:</strong> {courseId}</p>
        </div>
      )}

      {courseId && <ActivityList courseId={courseId} onActivitySelect={setSelectedActivityId} selectedActivityId={selectedActivityId} />}

      {selectedActivityId && (
        <div className="activity-screen-tasks-section">
          <TaskCreator activityId={selectedActivityId} />
          <TaskList activityId={selectedActivityId} onTaskSelect={setSelectedTaskId} selectedTaskId={selectedTaskId} />
          {selectedTaskId && <TaskReport courseId={courseId} taskId={selectedTaskId} />}
        </div>
      )}
    </div>
  );
}

export default ActivityScreen;
