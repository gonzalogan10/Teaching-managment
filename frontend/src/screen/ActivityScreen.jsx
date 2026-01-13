import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CourseSelector from  "../components/CourseSelector.jsx";
import ActivityList from "../components/ActivityList.jsx";
import TaskCreator from "../components/TaskCreator.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskReport from "../components/TaskReport.jsx";
import TeamCreator from "../components/TeamCreator.jsx";
import TeamList from "../components/TeamList.jsx";
import './Screen.css';

function ActivityScreen() {
  const [courseId, setCourseId] = useState(null);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const navigate = useNavigate();

  // Reset activity and task when course changes
  useEffect(() => {
    setSelectedActivityId(null);
    setSelectedTaskId(null);
    setSelectedTeamId(null);
  }, [courseId]);

  return (
    <div>

      <button className="go-to-page-button" onClick={() => navigate('/menu')}>
        Back to Menu
      </button>

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

      {courseId && (
        <div className="activity-screen-teams-section">
          <h2>Team Management</h2>
          <TeamCreator courseId={courseId} />
          <TeamList courseId={courseId} onTeamSelect={setSelectedTeamId} selectedTeamId={selectedTeamId} />
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
