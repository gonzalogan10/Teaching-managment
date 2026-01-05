import { useState } from "react";
import CourseSelector from  "../components/CourseSelector.jsx";
import ActivityCreator from "../components/ActivityCreator.jsx";

function ActivityScreen() {
  const [courseId, setCourseId] = useState(null);

  return (
    <div>
      <h2> Create an activity</h2>

      <CourseSelector onSelect={setCourseId} />

      <ActivityCreator courseId={courseId} />
    </div>
  );
}

export default ActivityScreen;
